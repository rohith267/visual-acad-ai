from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.summarizing_agent import SummarizingAgent
from agents.drawing_agent import DrawingAgent
from llm.openai_llm import OpenAIILLM

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

llm = OpenAIILLM('gpt-3.5-turbo')
summarizing_agent = SummarizingAgent(llm)
drawing_agent = DrawingAgent(llm)

@app.post("/flow")
async def get_mermaid(request: CodeRequest):
    summary = summarizing_agent.get_result(request.code)
    mermaid = drawing_agent.get_result(summary)
    response_body = {
        "mermaid": mermaid
    }
    return response_body