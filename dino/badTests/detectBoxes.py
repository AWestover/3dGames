import cv2
import os

from pdb import set_trace as tr

img=cv2.imread("ex.png", 0) # 0 means grayscale
cv2.imshow("image", img)
cv2.waitKey(0)

# tr()
img[img < 150] = 0
img[img != 0] = 255
cv2.imshow("image", img)
cv2.waitKey(0)

# then look for the first black stuff in the middle of the screen and send a box arround it...

cv2.drawContours(img, contours, -1, (0,255,0), 3)
cv2.imshow("image", img)
cv2.waitKey(0)



cv2.destroyAllWindows()



