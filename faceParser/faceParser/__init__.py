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
        c_hour = datetime.datetime.now().hour
        c_date = datetime.datetime.now().strftime('%H:%M:%S_.png') 
        imgDir = "faceParser/static/img"
        for f in os.listdir(imgDir):
            # cc_hour = int(f[:2])
            # if abs(cc_hour - c_hour) > 1:
            os.remove(join(imgDir, f)) 
        # im.save(join(imgDir, c_date))
        NUMCOLORS = 7
        imgRecolor(im, NUMCOLORS, join(imgDir, c_date))
        return jsonify(
                {
                    "path": join('static', 'img', c_date)
                })

    return app
