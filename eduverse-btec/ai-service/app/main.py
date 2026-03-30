from fastapi import FastAPI
from app.config import settings
from app.models.llama_model import LlamaModel
from app.routers import chat, feedback
from app.routers import memory as memory_router
from app.routers import agent as agent_router
from app.services.vector_memory import VectorMemory
from app.services.agent_service import AutonomousAgent

app = FastAPI(title='EduverseAI AI Service', version='3.0.0')
llm = LlamaModel()


@app.on_event('startup')
async def startup_event():
    await llm.initialize()
    app.state.llm = llm
    app.state.vector_memory = VectorMemory()
    app.state.agent = AutonomousAgent()


@app.get('/health')
async def health():
    return {'status': 'healthy', 'model': settings.MODEL_NAME}


app.include_router(chat.router, prefix='/chat', tags=['chat'])
app.include_router(feedback.router, prefix='/feedback', tags=['feedback'])
app.include_router(memory_router.router, prefix='/memory', tags=['memory'])
app.include_router(agent_router.router, prefix='/agent', tags=['agent'])
