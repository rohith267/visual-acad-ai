import json
from llm.base_llm import BaseLLM

DRAWING_SYSTEM_PROMPT = '''
You are an expert in writing mermaid code for visualizing code summary. You need to convert the given step by step explanation of code into a mermaid flowchart.

Respect the following rules while generating the output:
1. Only decisions/ if else conditions should be in {}, othersteps shouldn't be in {}
2. Always generate flowchart in the vertical direction

1.1 The input will be of the following format if single function is given:
1. Step 1
2. Step 2
3. Step 3

1.2 The input will be of the following format, if there are different functions, let's suppose f1 and f2, Start with the calling function, let's suppose f1

f1 function
1. Step 1
2. Step 2
3. Called f2 with params
4. Step 4..

f2 function
1. Step 1
2. Step 2...
...

3. If there are multiple functions explicitly given, enclose each function in a dotted box and show the relation between functions.

Make sure that the flowchart is simple and easy to understand.
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