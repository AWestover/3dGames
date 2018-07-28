import numpy as np
from pdb import set_trace as tr

def getGroups(mids, data, k):
	groups = [[] for i in range(0,k)]
	for d in data:
		groups[getMid(d, mids, k)].append(d)
	return groups

def getNewMids(groups, k, n):
	avgs = []
	for i in range(0, k):
		if len(groups[i]) > 0:
			avgs.append(np.average(groups[i], 0))
		else:
			avgs.append(np.random.rand(n))
	return np.array(avgs)

def getMid(pt, mids, k):
	dists = [np.linalg.norm(pt-mids[i]) for i in range(0,k)]
	minIdx = 0
	for i in range(1, k):
		if dists[i] < dists[minIdx]:
			minIdx = i
	return minIdx


def getFit(data, k, n):
	mids = np.random.rand(k, n)
	ITTERS = 50
	for i in range(ITTERS):
		groups = getGroups(mids, data, k)
		mids = getNewMids(groups, k, n)
	return mids
