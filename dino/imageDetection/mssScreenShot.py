# import mss
# import mss.tools

# with mss.mss() as sct:
#     # The screen part to capture
#     monitor = {'top': 160, 'left': 160, 'width': 160, 'height': 135}

#     # Grab the data
#     sct_img = sct.grab(monitor)

#     # Save to the picture file
#     mss.tools.to_png(sct_img.rgb, sct_img.size, output="file.png")
import time

import cv2
import mss
import numpy

with open(file, 'r') as f:
	coords = json.load(f)


with mss.mss() as sct:
    # Part of the screen to capture
    # monitor = {'top': 40, 'left': 0, 'width': 800, 'height': 640}
    monitor = {'top': coords['y'], 'left': coords['y'], 'width': coords['w'], 'height': coords['h']}

    while 'Screen capturing':
        last_time = time.time()

        # Get raw pixels from the screen, save it to a Numpy array
        img = numpy.array(sct.grab(monitor))

        # Display the picture
        cv2.imshow('OpenCV/Numpy normal', img)

        # Display the picture in grayscale
        # cv2.imshow('OpenCV/Numpy grayscale',
        #            cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY))

        print('fps: {0}'.format(1 / (time.time()-last_time)))

        # Press "q" to quit
        if cv2.waitKey(25) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break