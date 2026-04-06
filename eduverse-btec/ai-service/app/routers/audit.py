from fastapi import APIRouter, Request

router = APIRouter()


@router.get('/events')
async def list_audit_events(request: Request, limit: int = 50):
    data = request.app.state.audit.list_events(limit=limit)
    return {'events': [event.__dict__ for event in data]}
