import re

def process_for_pattern(pattern, line):
    matches = re.findall(pattern, line)
    if len(matches) > 0:
        return line.replace(matches[0], '\"' + matches[0] + '\"')
    else:
        return line

def fix_mermaid(mermaid):
    lines = mermaid.split('\n')
    new_lines = []
    for line in lines:
        new_line =  process_for_pattern(r'\{(.*?)\}$', line)
        new_line =  process_for_pattern(r'\((.*?)\)$', new_line)
        new_line =  process_for_pattern(r'\[(.*?)\]$', new_line)
        new_lines.append(new_line)

    return '\n'.join(new_lines)