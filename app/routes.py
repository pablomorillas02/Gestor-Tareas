from app import app
from flask import render_template, request, jsonify
import uuid
from app.json_util import get_tasks, write_tasks

# Ruta base de la página
@app.route('/')
def index():
    tasks = get_tasks()
    
    return render_template('index.html', tasks=tasks)

# Método para añadir tareas al archivo
@app.route('/add', methods=['POST'])
def add():
    data = request.form['data']
    
    id = str(uuid.uuid1())
    task = {'id': id, 'titulo': data, 'completada': False}
    
    tasks = get_tasks()
        
    firstTask = False if(tasks) else True
        
    tasks.append(task)
    
    write_tasks(tasks)
        
    return jsonify(success=True, task=task, firstTask=firstTask)

# Método para borrar tareas del archivo
@app.route('/delete_task', methods=['POST'])
def delete():
    task_id = request.form['task_id']
    
    tasks = get_tasks()
        
    tasks = [task for task in tasks if task['id'] != task_id]
    
    lastTask = False if(tasks) else True
    
    write_tasks(tasks)
        
    return jsonify(success=True, lastTask=lastTask)

# Método para actualizar el estado de una tarea
@app.route('/complete_task', methods=['POST'])
def complete():
    task_id = request.form['task_id']
    
    tasks = get_tasks()
        
    # Se va buscando de manera lineal la tarea seleccionada
    for task in tasks:
        if task['id'] == task_id:
            task['completada'] = not task['completada']
            break
    
    write_tasks(tasks)
        
    return jsonify(success=True)