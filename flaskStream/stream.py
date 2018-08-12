import requests

import matplotlib.pyplot as plt
import numpy as np

import time

Fs = 100
SECS = 10
NUM_CHANELS = 2
x = np.zeros((NUM_CHANELS, SECS*Fs))

# init data to zeros
fig, (ax1, ax2) = plt.subplots(1, 2)

t = 0

while True:
    time.sleep(0.2)
    t += 0.2
    
    # shift back the data 1 second
    x[:, :-1*Fs] = x[:, 1*Fs:]
    # get new data
    # x[:, -1*Fs:] = np.random.random((2, 1*Fs))
    new_data = np.array([
        np.sin(np.linspace(t, t+3, 1*Fs))+np.random.random((1*Fs)), 
        np.cos(np.linspace(t, t+3, 1*Fs))+np.random.random((1*Fs))
    ])
    x[:, -1*Fs:] = new_data
    
    # plot signal
    ax1.cla()
    ax1.plot(x[0])
    ax2.cla()
    ax2.plot(x[1])
    plt.pause(10e-7)
    try:
        print("sending data")
        requests.post('http://127.0.0.1:5000/pi', json=x.tolist())
    except:
        print("ERROR sending data")
        