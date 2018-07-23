# Standard imports
import cv2
import numpy as np
 
# Read image
im = cv2.imread("imgs/dinoB.png", cv2.IMREAD_GRAYSCALE)

# Set up the SimpleBlobdetector with default parameters.
params = cv2.SimpleBlobDetector_Params()
 
# Change thresholds
params.minThreshold = 0;
params.maxThreshold = 256;
 
# Filter by Area.
params.filterByArea = False
# params.minArea = 30
 
detector = cv2.SimpleBlobDetector_create(params)

# Detect blobs
reversemask=im
keypoints = detector.detect(reversemask)

print(keypoints)

from pdb import set_trace as tr

for i in range(0, len(keypoints)):
	ckps = keypoints[i].pt
	ckps = (int(ckps[0]), int(ckps[1]))
	cv2.circle(im, ckps, 10, (0,200,0))

# Show keypoints
cv2.imshow("Keypoints", im)
cv2.waitKey(0)