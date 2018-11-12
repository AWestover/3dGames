# walk picture
from PIL import Image
import numpy as np
import os

import matplotlib.pyplot as plt
from pdb import set_trace as tr


def deterministicRecolor(imgPath, change, saveFile=None, show=False):
	img = Image.open(imgPath)
	img = img.resize((66, 50), Image.ANTIALIAS)
	w,h = img.size
	img = img.convert("RGBA")
	datas = np.array(img)

	if show:
		plt.imshow(datas)
		plt.pause(2)

	datas += change

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

folder = "aldenImgs"
if __name__ == "__main__":
	for c in range(4):
		change = np.array([np.random.randint(0,255) for i in range(3)] + [0]).astype("uint8")
		if c == 0:
			change *= 0
		for file in os.listdir(folder):
			if "fly" in file and ".png" in file and "-" not in file:
				sf = file.replace(".png", "-{}.png".format(c+1))
				sf = os.path.join(folder, sf)
				print("deterministicRecoloring " + file)		
				deterministicRecolor(os.path.join(folder,file), change, show=False, saveFile=sf)
