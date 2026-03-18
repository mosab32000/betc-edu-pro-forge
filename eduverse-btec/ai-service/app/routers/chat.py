from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.services.privacy_service import redact_pii

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    context: str = 'general'
    user_id: str = 'anonymous'
    language: str = 'ar'


@router.post('/')
async def chat_endpoint(payload: ChatRequest, request: Request):
    llm = request.app.state.llm
    safe_prompt = redact_pii(payload.message)
    response = await llm.generate(safe_prompt)
    request.app.state.audit.log('chat_request', payload.user_id)
    return {'response': response, 'assistant': 'Nabata', 'pii_redacted': safe_prompt != payload.message}
