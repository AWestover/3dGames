# draw the selected rectangle

from tkinter import *
import json
import sys

def drawRect(file="coords.json"):
	root = Tk()
	root.attributes("-fullscreen", True)
	root.wait_visibility(root)
	root.wm_attributes('-alpha',0.3)

	w, h = root.winfo_screenwidth(), root.winfo_screenheight()

	canvas = Canvas(root, width=w, height=h)
	canvas.pack()

	with open(file, 'r') as f:
		coords = json.load(f)
	x=canvas.create_rectangle(coords['x'],coords['y'],coords['x']+coords['w'],coords['y']+coords['h'], fill='red')

	root.mainloop()


if __name__ == "__main__":
	try:
		file=sys.argv[1]
	except:
		file = "coords.json"
	drawRect(file)
