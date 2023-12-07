from app import app
from flask import render_template

@app.route('/')
def index():
    x = 50
    return render_template('index.html', x=x)