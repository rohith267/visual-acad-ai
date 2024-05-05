import json
from llm.base_llm import BaseLLM

DRAWING_SYSTEM_PROMPT = '''
You are an expert in writing mermaid code for visualizing code summary. You need to convert the given step by step explanation of code into a mermaid flowchart.

Respect the following rules while generating the output:
1. Only decisions should be in {}

The input will be of the following format:
1. Step 1
2. Step 2
3. Step 3
...

Here is a sample mermaid code:

flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]

The output should be in the following JSON format:
{
    "mermaid": "Corresponding mermaid code"
}
    
'''

class DrawingAgent:
    
    def __init__(self, llm: BaseLLM):
        self.llm = llm
    
    def get_result(self, summary: str):
        result = json.loads(self.llm.get_result(DRAWING_SYSTEM_PROMPT, summary))
        return result['mermaid']