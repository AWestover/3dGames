# change to new size
from PIL import Image
import os
# import sys

# https://stackoverflow.com/questions/273946/how-do-i-resize-an-image-using-pil-and-maintain-its-aspect-ratio

newSize=(66,50)

# inPlace (should it just overwrite the old file?)
def imgResize(imgPath, newSize, save=True, inPlace=False):
	img = Image.open(imgPath)
	img = img.resize(newSize, Image.ANTIALIAS)
	if save:
		if inPlace:
			img.save(imgPath)
		else:
			img.save(os.path.join("batch", imgPath))
	else:
		return img

if __name__ == "__main__":
	print("resizing")
	if not os.path.exists("batch"):
		os.mkdir("batch")
	imgResize("test.png", (66, 50))

	for stuff in os.walk(os.path.join("..", "pictures")):
		print(stuff)  # folder name, folders inside, files inside
		for f in stuff[2]:
			file = os.path.join(stuff[0], f)
			if ".png" in file:
				print("resizing " + file)
				imgResize(file, newSize, save=True, inPlace=True)
