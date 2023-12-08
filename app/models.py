import json
import os

def read_tasks():
    path = os.path.join(os.path.dirname(__file__), 'data', 'tasks.json')
    with open(path, 'r') as f:
        tasks = json.load(f)
        
    return tasks