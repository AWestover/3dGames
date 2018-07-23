// pick next gen
// choose the most fit
// also might need a lot of randomness, big mutations, or just plain random people

function nextGen(deadComps)
{	
	let newComps = [];
	let partitions = [1/8, 1/8, 6/8];
	// deadComps.sort(function(a, b){return (b.fitness-a.fitness);});
	deadComps = deadComps.reverse();
	for(let i in deadComps)
	{
		if (i < Math.floor(deadComps.length*partitions[0]))  // bests 
		{
			newComps.push(deadComps[i]);
		}
		else if (i < Math.floor(deadComps.length*(partitions[0]+partitions[1])))  // random
		{
			newComps.push(new Dino(compsPos[0], compsPos[1]));
		}
		else
		{
			let idx = Math.floor(Math.random()*deadComps.length*partitions[0]);
			let nextDino = new Dino(compsPos[0], compsPos[1], deadComps[idx].weights.slice());
			nextDino.mutateWeights();
			newComps.push(nextDino);
		}
	}

	return newComps;
}
