from llm.base_llm import BaseLLM
import os
from openai import OpenAI

os.environ['OPENAI_API_KEY'] = 'Your Api Key'

class OpenAIILLM(BaseLLM):

    def __init__(self, name):
        super().__init__(name)
        self.client = OpenAI()
    
    def get_result(self, system_prompt, user_prompt):
        response = self.client.chat.completions.create(
            model=self.name,
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
    
    def get_result_with_history(self, system_prompt, chat_history):
        response = self.client.chat.completions.create(
            model=self.name,
            messages=[
                {
                    "role": "system", 
                    "content": system_prompt
                }
            ] + chat_history,
        )
        return response.choices[0].message.content