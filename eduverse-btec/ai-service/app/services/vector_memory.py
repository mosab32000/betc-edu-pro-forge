from __future__ import annotations

import math
from dataclasses import dataclass
from typing import List


@dataclass
class MemoryItem:
    id: str
    text: str
    vector: List[float]
    metadata: dict


class VectorMemory:
    def __init__(self) -> None:
        self._items: list[MemoryItem] = []

    def _embed(self, text: str) -> List[float]:
        # Lightweight deterministic embedding placeholder for local/offline usage.
        base = [0.0] * 8
        for i, ch in enumerate(text.lower()):
            base[i % 8] += (ord(ch) % 31) / 31.0
        norm = math.sqrt(sum(v * v for v in base)) or 1.0
        return [v / norm for v in base]

    def upsert(self, item_id: str, text: str, metadata: dict | None = None) -> MemoryItem:
        metadata = metadata or {}
        vector = self._embed(text)
        item = MemoryItem(id=item_id, text=text, vector=vector, metadata=metadata)
        self._items = [it for it in self._items if it.id != item_id]
        self._items.append(item)
        return item

    def query(self, text: str, top_k: int = 3) -> list[MemoryItem]:
        qv = self._embed(text)

        def similarity(v1: List[float], v2: List[float]) -> float:
            return sum(a * b for a, b in zip(v1, v2))

        ranked = sorted(self._items, key=lambda it: similarity(it.vector, qv), reverse=True)
        return ranked[:top_k]
