from fastapi import APIRouter, Request
from pydantic import BaseModel, Field

router = APIRouter()


class UpsertMemoryRequest(BaseModel):
    id: str
    text: str
    metadata: dict = Field(default_factory=dict)


class QueryMemoryRequest(BaseModel):
    query: str
    top_k: int = 3


@router.post('/upsert')
async def upsert_memory(payload: UpsertMemoryRequest, request: Request):
    item = request.app.state.vector_memory.upsert(payload.id, payload.text, payload.metadata)
    return {'id': item.id, 'metadata': item.metadata}


@router.post('/query')
async def query_memory(payload: QueryMemoryRequest, request: Request):
    results = request.app.state.vector_memory.query(payload.query, top_k=payload.top_k)
    return {
        'results': [
            {'id': item.id, 'text': item.text, 'metadata': item.metadata}
            for item in results
        ]
    }
