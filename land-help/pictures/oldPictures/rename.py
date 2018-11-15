
import os


for f in os.listdir("."):
	if "-o" not in f and ".png" in f:
		new_name = f[0:-5] + "-original"+f[-5:]
		print(new_name)
		os.rename(f, new_name)
