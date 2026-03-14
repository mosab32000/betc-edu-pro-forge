from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter()


class AgentTaskRequest(BaseModel):
    task: str


@router.post('/run')
async def run_agent(payload: AgentTaskRequest, request: Request):
    return request.app.state.agent.execute(payload.task)
