#!/usr/bin/env python3
"""AI-inspired quality guard (offline heuristic checks)."""

from __future__ import annotations

import argparse
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]

SUSPICIOUS_PATTERNS = [
    re.compile(r'\bTODO\b', re.IGNORECASE),
    re.compile(r'\bFIXME\b', re.IGNORECASE),
    re.compile(r'PRIVATE_KEY\s*='),
    re.compile(r'AKIA[0-9A-Z]{16}')
]

SCANNED_EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.py'}
IGNORED_FILES = {
    '.github/workflows/security-scan.yml'
}


def iter_files() -> list[pathlib.Path]:
    files: list[pathlib.Path] = []
    for path in ROOT.rglob('*'):
        if not path.is_file():
            continue
        if '.git' in path.parts or 'node_modules' in path.parts or '__pycache__' in path.parts:
            continue
        rel = str(path.relative_to(ROOT))
        if rel in IGNORED_FILES:
            continue
        if path.suffix in SCANNED_EXTENSIONS:
            files.append(path)
    return files


def run_checks(strict: bool) -> int:
    issues: list[str] = []
    for file in iter_files():
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
        except Exception:
            continue
        for pattern in SUSPICIOUS_PATTERNS:
            if pattern.search(content):
                rel = file.relative_to(ROOT)
                issues.append(f'{rel}: matched pattern {pattern.pattern}')

    if issues:
        print('Quality guard found potential issues:')
        for issue in issues:
            print(f'- {issue}')
        return 1 if strict else 0

    print('Quality guard passed: no suspicious patterns found.')
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--strict', action='store_true')
    args = parser.parse_args()
    return run_checks(strict=args.strict)


if __name__ == '__main__':
    sys.exit(main())
