// helper functions

function initAnimals(popSize)
{
	let anis=[];
	for (let i = 0; i < popSize; i++)
	{
		anis.push(0);
	}
	return anis;
}

function updateAnimals(animals, foods)
{
	let newAnimals = [];
	for (let i in animals)
	{
		if (animals[i] < maxHunger)
		{
			newAnimals.push(animals[i]+dHunger);
			if (random() < rebirthPr)
			{
				newAnimals.push(0);
			}
		}
		else
		{
			if (foods > 0)
			{
				newAnimals.push(0);
				foods -= 1;
			}
		}
	}	
	return {"animals": newAnimals, "foods": foods};
}

function initPlot(plotDiv)
{
	Plotly.plot( plotDiv, [{ y: [], name: "population" }] );
	Plotly.plot( plotDiv, [{ y: [], name: "food" }] );
}

function resetPlot(plotDiv)
{
	Plotly.purge(plotDiv);
	initPlot(plotDiv);
}

function updatePlot(nPopulation, nFood, plotDiv)
{
	Plotly.extendTraces(plotDiv, { y: [nPopulation, nFood] }, [0, 1]);
}

function updateFoodDelay()
{
	foodLengthMult = int(document.getElementById('foodDelay').value);
	foodCycleLength = (foodLengthMult*0.01)*Math.floor(maxHunger / dHunger); //frames
}

function updateFoodAmmount()
{
	numFoods = int(document.getElementById('foodAmmount').value);
}
