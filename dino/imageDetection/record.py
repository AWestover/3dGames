"""
TO DO:

Smarter jumping
get the speed
genetic
look at more than just the closest obstacle
add ducking

"""

# python2 -W ignore to ignore warnings
# python -W ignore record.py
from contours import *
import pyscreenshot
import json
from os.path import join
import time
from pdb import set_trace as tr
import matplotlib.pyplot as plt
import os
import numpy as np
# import threading
import time
import sys
import pyautogui as pyg

import mss
import mss.tools


try:
    file = sys.argv[1]
except:
    file = "coords.json"

try:
    ez = sys.argv[2]
    if ez.lower() == "easy":
        easy=True
    else:
        easy = False
except:
    ez = True

if ez:
    threshold = 200
else:
    threshold = 170

with open(file, 'r') as f:
    coords = json.load(f)

sbbox = (coords['x'], coords['y'], coords['x']+coords['w'], coords['y']+coords['h'])
bbbox = {'top': coords['y'], 'left': coords['y'], 'width': coords['w'], 'height': coords['h']}

def shot():
    im=pyscreenshot.grab(bbox=sbbox)
    im.save(join("imgs", "dinoB.png"))

def betterShot():
    with mss.mss() as sct:
        # Grab the data
        sct_img = sct.grab(bbbox)
        # Save to the picture file
        mss.tools.to_png(sct_img.rgb, sct_img.size, output=join("imgs", "dinoB.png"))


def firstItteration():
    betterShot()
    conts = getContours()
    dinoX = conts[0][0][0]  # front back x
    dinoW = conts[0][1][0] - dinoX  # width
    groundY = conts[0][1][1]
    print(dinoW)
    return dinoX, dinoW, groundY

def record(show=False, write=False):
    xs=[];vs=[];dvs=[];dt=[0]; ts= [];
    dinoX, dinoW, groundY = firstItteration()
    space=5  # space to distinguish between dino and other things
    begin=time.time()

    fig, ax = plt.subplots(2, 1)    

    while True:
        betterShot()
        conts = getContours(save=True)

        idx = 0
        while idx < len(conts):
            if conts[idx][0][0] < dinoX+dinoW:
                idx += 1
            else:
                break

        if idx != len(conts):
            cx = conts[idx][1][0] - (dinoX)
            xs.append(cx)

            if len(xs) > 1 and xs[-1]-xs[-2] < 0:
                vs.append(xs[-1]-xs[-2])
                # if len(vs) > 1:
                    # dvs.append(vs[-1]-vs[-2])

            if cx < 0:
                pyg.alert(text="cx<0 oh no what is happening")
            if show:
                ax[1].clear()
                ax[0].clear()
                # ax[0].plot(range(len(xs)), xs)

            if len(vs) > 0:
                t=np.linspace(0, len(vs), len(vs))
                w = np.polyfit(t, vs, 1)
                p = np.poly1d(w)
                cvel = p(t[-1]+1)
                deltaT = space*4
                # decide = (cx-dinoW/2) / (-cvel)
                if len(t) > 10:
                    dThresh = abs(cvel)*2
                else:
                    dThresh = 0
                print(dThresh)
                onTheGround = abs(conts[0][1][1] - groundY) < 10
                ts.append(time.time()-begin) 
                if cx < (threshold + dThresh) and onTheGround:
                    # print("jump", cx, time.time()-begin)
                    obsOnGround = abs(conts[idx][1][1] - groundY) < 30
                    if obsOnGround:
                        os.system("python3 jump.py")
                    else:
                        os.system("python3 duck.py")
                    # pyg.alert(title="jump", text="jump")
                    # ax[1].imshow(cv2.imread('imgs/dinoBoxes.png'))
                if show:
                    ax[0].set_title(cvel)
                    ax[0].plot(t, vs)
                    # ax[0].plot(t, p(t))
                    # ax[0].plot(range(len(dvs)), dvs)
                    plt.pause(0.1)


        if write:
            with open("vs.json", "w") as f:
                vs = [float(vsi) for vsi in vs]
                json.dump({"vs": vs}, f)

            with open("time.json", "w") as f:
                ts = [float(tsi) for tsi in ts]
                json.dump({"ts":ts}, f)


if __name__ == "__main__":
    try:
        record(show=False, write=True)
    finally: 
        pyg.alert(title="record broke", text="you probably moved off of the dino screen, \
            and broke record.py you can now run it again I think")

