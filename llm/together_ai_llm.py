from llm.base_llm import BaseLLM
import os
from openai import OpenAI

TOGETHER_API_KEY = 'your-together-ai-key'

MODEL_MAP = {
    'llama2-70b': 'meta-llama/Llama-2-70b-chat-hf',
    'llama3-70b': 'meta-llama/Llama-3-70b-chat-hf'
}

class TogetherAILLM(BaseLLM):

    def __init__(self, name):
        super().__init__(name)
        self.client = OpenAI(
            api_key=TOGETHER_API_KEY,
            base_url='https://api.together.xyz/v1',
        )
        self.model_name = MODEL_MAP[name]
    
    def get_result(self, system_prompt, user_prompt):
        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=[
                {
                    "role": "system", 
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
        )
        return response.choices[0].message.content