import matplotlib.pyplot as plt
import json
from pdb import set_trace as tr
import numpy as np

def pltdata():
	x = []
	itts = []; i=0;
	with open("data.txt", "r") as f:
		for r in f:
			cur = r.strip()
			try:
				x.append(int(cur))
			except:
				x.append(0)
			itts.append(i)
			i+=1

	plt.plot(itts, x)
	plt.show()


def pltvs():
	with open("vsGOod2.json", "r") as f:
		x = json.load(f)['vs']

	y = []; t=[];
	for i in range(len(x)):
		if x[i] < 0:
			y.append(x[i])
			t.append(i)
	t=np.array(t)

	w = np.polyfit(t, y, 1)
	p = np.poly1d(w)
	print(w)

	plt.plot(t, y)
	plt.plot(t, p(t))

	plt.show()

def pltTs():
	with open("time.json", "r") as f:
		ts = json.load(f)['ts']

	t=range(len(ts))
	plt.plot(t, ts)

	plt.show()

if __name__ == "__main__":
	pltTs()