import json
import os

def get_path():
    path = os.path.join(os.path.dirname(__file__), 'data', 'tasks.json')
    
    return path

def get_tasks():
    path = get_path()
    
    with open(path, 'r') as f:
        tasks = json.load(f)
    
    return tasks

def write_tasks(new_tasks):
    path = get_path()
    
    with open(path, 'w') as f:
        json.dump(new_tasks, f)
    
    