// Main program 

// environment variables
const maxHunger = 5;
const dHunger = 0.05;
const rebirthPr = 0.004;
const initPopulation = 5;
let numFoods = 50;
let foodLengthMult = 100;
let foodCycleLength = (foodLengthMult*0.01)*Math.floor(maxHunger / dHunger); //frames

// plotting info
let plotDiv = document.getElementById('population-plot');

// interesting statistics showing how stable environment is
let nPopulation = []; // all population info
let cyclePopulation = []; // population from this cycle (to append to graph)
let nFood = [];

// simulation variables
let foods; // how much food is availiable
let animals; // animals are defined only by their hunger
let time; // to reset the food

let dogPic;

function preload()
{
	dogPic = loadImage("dog2.png");
}

function setup()
{
	let canvas = createCanvas(512, 512);
	canvas.parent("canvas-holder");

	foods = numFoods; time = 0;
	animals = initAnimals(initPopulation);

	initPlot(plotDiv);
}

function draw()
{
	// regular updates
	time += 1;
	let res = updateAnimals(animals, foods);
	animals = res["animals"]; foods = res["foods"];
	if (time % foodCycleLength == 0)
	{
		foods += numFoods;
	}

	// force quit if there are too many animals
	if (animals.length > 10000)
	{
		console.log("Too many animals!!!!");
		noLoop();
	}
	
	// display population dynamics
	nPopulation.push(animals.length);
	updatePlot([animals.length], [foods], plotDiv);
	nFood.push(foods);

	if (time % 10 == 0)
	{
		background(100, 100, 100);
		for (let i = 0; i < animals.length; i++)
		{
			image(dogPic, width*random(), height*random());	
		}

		if (time % 2000 == 0)
		{
			resetPlot(plotDiv);
		}
	}
}
