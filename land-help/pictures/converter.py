# converts white to transparent backgruond
from PIL import Image
import os

from os.path import join

def imgTransparent(imgPath, inPlace=True):

	img = Image.open(imgPath)
	img = img.convert("RGBA")
	datas = img.getdata()

	newData = []
	for item in datas:
		if ((255-item[0])+(255-item[1])+(255-item[2])) < 15:
			newData.append((255, 255, 255, 0))
		else:
			newData.append(item)

	img.putdata(newData)

	print("transparent " + imgPath)

	if inPlace:
		img.save(imgPath)
	else:
		img.save(join("batch", imgPath))


if __name__ == "__main__":
	if not os.path.exists("batch"):
		os.mkdir("batch")

	mass=False
	if mass:
		for file in os.listdir():
			if ".png" in file:
				imgTransparent(file)
	else:
		imgTransparent("butterfly.png", inPlace=True)


