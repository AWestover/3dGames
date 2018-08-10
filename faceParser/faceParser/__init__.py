# main app

from os.path import join
import os

from PIL import Image
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import datetime
from flask import Flask, redirect, render_template, request, session, url_for, jsonify

from faceParser.recolor import *

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/upload', methods=("POST",))
    def upload():
        im_data = request.values['data_uri']
        im_data = im_data.replace('data:image/jpeg;base64,', '')
        im = Image.open(BytesIO(base64.b64decode(im_data)))
        NUMCOLORS = int(request.values['num_colors'])
        res_uri = imgRecolor(im, NUMCOLORS).decode('utf-8')
        res_uri = 'data:image/jpeg;base64,' + res_uri
        return jsonify({"path": res_uri})
        
    return app
