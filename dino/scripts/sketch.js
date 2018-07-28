// main program

function setup()
{
	pictures = [loadImage("pictures/dino3.png"), loadImage("pictures/dino4.png")];
	screen_dims = [windowWidth*1, windowHeight*1];
	createCanvas(screen_dims[0],screen_dims[1]);

	frameRate(fr);

	dinoPos = [screen_dims[0]*0.25, screen_dims[1]*0.3];
	compsPos = [screen_dims[0]*0.25, screen_dims[1]*0.8];

	dino = new Dino(dinoPos[0], dinoPos[1], [], -1);
	dinoGame = new Game(dinoPos[0], dinoPos[1]);

	comps = [];
	for (let i= 0; i < numComps; i++)
	{
		comps.push(new Dino(compsPos[0], compsPos[1]));
	}
	compsGame = new Game(compsPos[0], compsPos[1]);
}

function draw()
{
	background(255, 255, 255);
	fill(0,10,10);
	rect(0,screen_dims[1]/2-rhh/2, screen_dims[0], rhh);
		
	if (dino.checkCollisions(dinoGame))
	{
		dinoGame.initGame();
		dino.reset();
		dino.fitness -= 1;
		console.log("life before death");
	}
	dino.update();
	dino.show();
	dinoGame.updateObstacles();
	text("Obstacles cleared: " + dino.obstaclesCleared, 100, 100);
	text("Deaths: " +(-dino.fitness-1), 100, 200);

	let state = compsGame.getState();
	let normFactors = compsGame.getNormFactors(); // only approximate...
	for (let i = 0; i < comps.length; i++) {
		if (comps[i].checkCollisions(compsGame))
		{
			comps[i].fitness = comps[i].fitness*0.1 + comps[i].obstaclesCleared;// decay to old guys
			deadComps.push(comps.splice(i, 1)[0]);
		}
		else
		{
			comps[i].update();
			comps[i].show();
			if (!comps[i].isJumping())
			{
				if (comps[i].jumpPrediction(state, normFactors))
				{
					comps[i].jump();
				}
			}
		}
	}
	compsGame.updateObstacles();

	if (comps.length == 0)
	{
		comps = nextGen(deadComps); 
		deadComps = [];
		compsGame.initGame();
	}

}

function touchEnded()
{
	dino.jump();
}

function keyPressed()
{
	if (key == " " || key.toLowerCase() == "w")
	{
		dino.jump();
	}
	else if (key.toLowerCase() == "p")
	{
		alert("PAUSE");
	}
}

function mousePressed()
{
	console.log(mouseX + ", " + mouseY);
}
