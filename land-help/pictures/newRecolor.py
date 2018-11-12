# walk picture
from PIL import Image
import numpy as np
import os

import matplotlib.pyplot as plt
from pdb import set_trace as tr


def deterministicRecolor(imgPath, saveFile=None, show=False):
	img = Image.open(imgPath)
	w,h = img.size
	img = img.convert("RGBA")
	datas = np.array(img)

	if show:
		plt.imshow(datas)
		plt.pause(2)

	total = np.array([np.random.randint(0,255) for i in range(3)] + [0]).astype("uint8")

	datas += total


	if show:
		plt.imshow(datas)
		plt.pause(2)
	
	print("Saved")
	datas = datas.reshape(w*h, 4)
	datas = datas.tolist()
	datas = [tuple(datasi) for datasi in datas]
	img.putdata(datas)
	if saveFile:
		img.save(saveFile)
	else:
		img.save(os.path.join("batch", imgPath))
	# img.save(os.path.join("currentPics", "batch", "butterfly0.png"))


if __name__ == "__main__":
	for file in os.listdir("aldenImgs"):
		if ".png" in file:
			print("randifying " + file)
			deterministicRecolor(os.path.join("aldenImgs",file), show=True)
