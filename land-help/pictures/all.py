from converter import *
from resize import *
from recolor import *
from randifyPic import *
import sys
import os
from os.path import join
import shutil

MAXLVLS = [4,1,1]
COLORS = 10

sizes = [(66, 50), (30, 30), (75, 100)]
try:
    fName = sys.argv[1]
except:
    print("Please input the file name of the animal "+
            "you will be generating pictures for as a command line argument")
    sys.exit()

try:
    idx = int(sys.argv[2])
    newSize = sizes[idx]
    maxLvl = MAXLVLS[idx]
except: 
    print("Input index of size (0 animal, 1 prey, 2 predator) " +
            "as command line argument")
    sys.exit()

try:
  if sys.argv[3] == "no":
    resize = False
  else: 
    resize = True
except:
  resize = True

if not os.path.exists("batch"):
    os.mkdir("batch")

imgTransparent(fName, inPlace=False)
if resize:
  imgResize(join("batch", fName), newSize, save=True, inPlace=True)
else:
  os.system("cp {0} batch/{0}".format(fName))

for i in range(0, maxLvl+1):
    splt = fName.split(".png")
    cFName = splt[0] + str(i) + splt[1] + ".png"
    cFName = join("batch", cFName)
    print(cFName, fName)
    if i == 0:
        randPicture(join("batch", fName), saveFile=cFName, show=False)
    elif i == 1:
        shutil.copyfile(join("batch", fName), cFName)
    elif i > 1:
        imgRecolor(join("batch", fName), COLORS, simplify=False, saveFile=cFName)
