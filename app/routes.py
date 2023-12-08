from app import app
from flask import render_template, request
from app.models import read_tasks
import uuid
import json
import os

@app.route('/')
def index():
    tasks = read_tasks()
    
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add():
    data = request.form['data']
    
    id = str(uuid.uuid1())
    task = {'id': id, 'titulo': data, 'completada': False}
    
    path = os.path.join(os.path.dirname(__file__), 'data', 'tasks.json')
    
    with open(path, 'r') as f:
        tasks = json.load(f)
        
    tasks.append(task)
    
    with open(path, 'w') as f:
        json.dump(tasks, f)
        
    return render_template('index.html', tasks=tasks)
