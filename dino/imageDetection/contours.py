import numpy as np
import cv2
from os.path import join
from pdb import set_trace as tr

def boxify(contour):
	return np.min(contour, axis=0)[0], np.max(contour, axis=0)[0]

def area(box):
	return ( box[1][0] - box[0][0] ) * ( box[1][1] - box[0][1] )

def notFlat(box):
	return (box[1][1] - box[0][1]) > 10

def getColors(arr):
	cols = []
	for i in arr:
		for j in i:
			try:
				jc = j.tolist()
			except:
				jc = j
			if jc not in cols:
				cols.append(jc)
	return cols

def getContours(show=False, write=False, save=False):
	im = cv2.imread(join("imgs", 'dinoB.png'))
	imgray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
	ret, thresh = cv2.threshold(imgray, 100, 255, 0)
	im2, contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

	# cv2.imshow("image",thresh)
	# cv2.waitKey(0)

	boxes = [boxify(contour) for contour in contours]
	
	realBoxes = []
	for i in range(0, len(boxes)):
		if len(contours[i]) > 7 and area(boxes[i]) > 200:  # big enough
			if notFlat(boxes[i]):
				if boxes[i][0][0] > 10:  # far enough (not corners)
					realBoxes.append(boxes[i])
	realBoxes.sort(key=lambda realBoxes: realBoxes[0][0])

	if write:
		with open("data.txt", "a+") as f:
			f.write(str(realBoxes[1][1][0]) + "\n")
			print(realBoxes[1][1][0])

	# cv2.drawContours(im, contours[idx], -1, (0,255,0), 3)
	if show or save:
		for box in realBoxes:
			cv2.rectangle(im, tuple(box[0]), tuple(box[1]), (255,0,0), 3)
		if show:
			cv2.imshow("im", im)
			cv2.waitKey(0)
			cv2.destroyAllWindows()
		if save:
			cv2.imwrite('imgs/dinoBoxes.png', im)
	return realBoxes

if __name__ == "__main__":
	try:
		# getContours(show=True)
		getContours(show=False)
	except:
		print("ERROR")