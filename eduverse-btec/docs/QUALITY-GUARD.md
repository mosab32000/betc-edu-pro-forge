# AI Quality Guard

`/scripts/ai_quality_guard.py` provides an offline heuristic quality scan for:

- TODO/FIXME leftovers
- suspicious secret patterns

## Usage

```bash
python scripts/ai_quality_guard.py --strict
```

## Integration points

- Git pre-commit hook (`.husky/pre-commit`)
- CI workflow (security scan and/or lint job)
- Local developer checks before opening PR
