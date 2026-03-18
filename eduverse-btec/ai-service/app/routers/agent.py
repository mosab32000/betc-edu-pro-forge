from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter()


class AgentTaskRequest(BaseModel):
    task: str
    actor: str = 'system'


@router.post('/run')
async def run_agent(payload: AgentTaskRequest, request: Request):
    output = request.app.state.agent.execute(payload.task)
    request.app.state.audit.log('agent_run', payload.actor)
    return output
