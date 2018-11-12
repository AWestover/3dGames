
# DOES NOT WORK, OVERWRITES FILES!!!!!!!!!!
import os

ns = os.listdir('.')

for f in ns:
	if "squirrel" in f and '-' in f:
		print(f)
		x = int(f.split('-')[1].replace('.png', ''))
		nn = f.split('-')[0]+'-'+str(x+1)+'.png'
		os.rename(f, nn)
		print(nn)

