from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    context: str = 'general'
    user_id: str = 'anonymous'
    language: str = 'ar'


@router.post('/')
async def chat_endpoint(payload: ChatRequest, request: Request):
    llm = request.app.state.llm
    response = await llm.generate(payload.message)
    return {'response': response, 'assistant': 'Nabata'}
