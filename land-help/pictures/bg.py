import matplotlib.pyplot as plt
import numpy as np

from pdb import set_trace as tr

w = 512
xs = np.linspace(-1,1,w)
ys = np.linspace(-1,1,w)

def gauss(x, y, mx, my, sigma):
	arg = -((x-mx)**2+(y-my)**2)/(2*sigma)
	return np.e**arg

def fullGauss(mx, my, sigma):
	rock = np.zeros((w,w))
	for xi in range(0, len(xs)):
		for yi in range(0, len(ys)):
			rock[xi][yi] = 5*gauss(xs[xi], ys[yi], mx, my, sigma)
	return rock

bg = np.random.randn(w,w)
for i in range(0, 30):
	bg += fullGauss(np.random.rand()*2-1, np.random.rand()*2-1, 0.03)
plt.imshow(bg)
plt.axis("off")
plt.savefig("bg.png")
plt.show()
