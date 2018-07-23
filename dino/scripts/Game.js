class Game
{
	constructor(x, y) 
	{
		// position of the dinos (default, not jump pos)
		this.base_pos = createVector(x, y);
		this.initGame();
	}

	genObstacle()
	{
		let cx;
		if (this.obstacles.length == 0)
		{
	    	cx = screen_dims[0];
		}
		else
		{
			cx = this.obstacles[this.obstacles.length-1].pos.x + randomGaussian(xOffObs+100*this.speed/startSpeed, 50);
		}
	    let ch = randomGaussian(obsth["mu"], obsth["sigma"]);
	    let cw = randomGaussian(obstw["mu"], obstw["sigma"]);
	    let cy = this.base_pos.y - ch + image_dims[1] - randomGaussian(30, 5);

	    this.numberOfObstacles += 1;

	    this.obstacles.push(new Obstacle(createVector(cx, cy), createVector(cw, ch)));
	}

	updateObstacles()
	{
		this.speed += acceleration;
		fill(0, 255, 100,100);
		rect(0, this.base_pos.y+image_dims[1], screen_dims[0], 5);
		fill(0,0,0);
		for (let i = 0; i < this.obstacles.length; i++)
		{
			this.obstacles[i].update(this.speed);
			if (this.obstacles[i].isPast(this.base_pos.x))
			{
				this.pastObstacles.push(this.obstacles.splice(i, 1)[0]);
				i -= 1;
			}
			
		}
		for (let i = 0; i < this.pastObstacles.length; i++)
		{
			this.pastObstacles[i].update(this.speed);
			if (this.pastObstacles[i].shouldDie())
			{
				this.pastObstacles.splice(i, 1);
				i -= 1;
				this.genObstacle();
			}
		}
	}

	getState()
	{
		let x = this.obstacles[0].getState();
		x.push(this.speed);
		return x;
	}

	getNormFactors()
	{
		let f= this.obstacles[0].getNormFactors();
		f.push(12);// speed starts at about 6
		return f
	}

	initGame()
	{
		this.speed = startSpeed;
		this.obstacles = [];
		this.pastObstacles = []; //for display purpose only
		this.numberOfObstacles = 0;
		this.genObstacle();
		this.genObstacle();
		this.genObstacle();
	}

}