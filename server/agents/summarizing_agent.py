from llm.base_llm import BaseLLM

SUMMARIZING_SYSTEM_PROMPT = '''
You are an expert in code Understanding. You will be given a python function as the input. You need to output a step by step walk through of the function in simple terms and short sentences.

1. The output should be of the following format:
1. Step 1
2. Step 2
3. Step 3

2. If there are different functions, let's suppose f1 and f2

Start with the calling function, let's suppose f1
f1
1. Step 1
2. Step 2
3. Called f2 with params
4. Step 4..

f2
1. Step 1
2. Step 2...
...
'''

class SummarizingAgent:
    
    def __init__(self, llm: BaseLLM):
        self.llm = llm
    
    def get_result(self, code: str):
        return self.llm.get_result(SUMMARIZING_SYSTEM_PROMPT, code)