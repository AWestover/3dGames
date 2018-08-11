
import json
import time

from flask import Flask, render_template, request

app = Flask(__name__)
data = []

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/stream', methods=('GET',))
def stream():
    return json.dumps(data)
    
@app.route('/pi', methods=['POST'])
def pi():
    global data
    data = request.json
    return ""

@app.route('/test')
def test():
    return render_template('test.html')

if __name__ == '__main__':
    app.run(debug=True)

