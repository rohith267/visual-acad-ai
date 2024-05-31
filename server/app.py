from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.summarizing_agent import SummarizingAgent
from agents.drawing_agent import DrawingAgent
from agents.chat_agent import ChatAgent
from llm.openai_llm import OpenAIILLM
import utils
from typing import List, Dict

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

class ChatRequest(BaseModel):
    code: str
    summary: str
    mermaid: str
    messages: List[Dict[str,str]]

llm = OpenAIILLM('gpt-3.5-turbo')
summarizing_agent = SummarizingAgent(llm)
drawing_agent = DrawingAgent(llm)

@app.post("/flow")
async def get_mermaid(request: CodeRequest):
    summary = summarizing_agent.get_result(request.code)
    mermaid = drawing_agent.get_result(summary)
    mermaid = utils.fix_mermaid(mermaid)
    print(mermaid)
    response_body = {
        "mermaid": mermaid,
        "summary": summary
    }
    return response_body

@app.post("/chat")
async def get_chat_response(request: ChatRequest):
    chat_agent = ChatAgent(llm, request.code, request.summary, request.mermaid)
    response = chat_agent.get_result(request.messages)
    response_body = {"content": response}
    return response_body