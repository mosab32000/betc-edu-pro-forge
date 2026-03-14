from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class FeedbackRequest(BaseModel):
    assignment_id: str
    content: str


@router.post('/')
async def feedback_endpoint(payload: FeedbackRequest):
    return {'feedback': f"Reviewed {payload.assignment_id}"}
