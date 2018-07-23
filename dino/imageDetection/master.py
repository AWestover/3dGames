# python 3
import pyautogui as pyg
from markRect import *
from drawRect import *
import os
from plotData import *

x = "none"
while x!="quit":
    x = pyg.prompt(text="input a command", title="dino jump master", default="record")
    if x == "draw":
        drawRect()
    elif x == "mark":
        markRect()
    elif x=="draw chrome":
        drawRect(file="coordsReal.json")
    elif x== "record chrome":
        os.system("python2 -W ignore record.py coordsReal.json")
    elif x == "record":
        os.system("python2 -W ignore record.py coords.json")
    elif x == "record ez":
        os.system("python2 -W ignore record.py coords.json easy")
    elif x == "plot vs":
        pltvs()
    elif x == "plot ts":
        pltTs()
    else:
        x = "quit"
