// simple animation

let sca = 3;
let dog;
let pos;
let vel;
let rotated;
let screen_dims;
let dt=2;
let dims = [66, 50];
let visible_dims = [dims[0]*sca, dims[1]*sca];
let visible_screen_dims;

let zoom;

function move()
{
    let th = (Math.random()-0.5)*0.6;
    if (Math.random() < 0.5) {
      th = 0;
    }
    let nx = vel.x*Math.cos(th) - vel.y*Math.sin(th);
    let ny = vel.x*Math.sin(th) + vel.y*Math.cos(th);

    vel.x = nx; vel.y = ny;
    pos.add(p5.Vector.mult(vel, dt));

    rotated=Math.sign(vel.x);
  }

function setup()
{
	console.log("Running home page for theland");
	dog = loadImage("dog.png");
	pos = createVector(0, 0);
	vel = createVector(0, 1);
	screen_dims = [windowWidth, windowHeight*0.7];
	visible_screen_dims = [screen_dims[0]/sca, screen_dims[1]/sca];

	createCanvas(screen_dims[0], screen_dims[1]);

	zoom = createSlider(0, 5, 1, 0);// min, max, init, step
	zoom.style("width", "300px");
  	zoom.position(200, 550);
}

function loopScreen()
{
	let eps = 0;
	if(pos.x - dims[0]/2 < -visible_screen_dims[0]/2)
	{
		console.log("xleft");
		pos.x = visible_screen_dims[0]/2-(dims[0]/2+eps);
	}
	else if(pos.x+dims[0]/2>visible_screen_dims[0]/2)
	{
		console.log("xright");
		pos.x = -visible_screen_dims[0]/2 + dims[0]/2 + eps;
	}

	if (pos.y - dims[1]/2 < -visible_screen_dims[1]/2)
	{
		console.log("yup");
		pos.y = visible_screen_dims[1]/2 - (dims[1]+eps);
	}
	else if(pos.y+dims[1]/2 > visible_screen_dims[1]/2)
	{
		console.log("ydown");
		pos.y = -visible_screen_dims[1]/2 + dims[1]/2 + eps;
	}
}

function draw()
{
	translate(screen_dims[0]/2, screen_dims[1]/2);
	background(0, 100, 10);

	sca = zoom.value();

	scale(sca, sca);
	push();
	translate(pos.x, pos.y);
	scale(rotated, 1);
	image(dog, -dims[0]/2, -dims[1]/2);
	pop();

	move();
	loopScreen();
}
