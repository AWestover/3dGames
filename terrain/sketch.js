
let sunCt = 0;
const sca = 40;
let heights;
let hues;
let w, h;
const n = 40;
const speed = 0.01;
let butterfly;

let th = 0; let phi = 0;
let off = [0, 0];
let angles = [0, 0, 0];

let lastDownY = 0;

function preload()
{
	butterfly = loadImage("imgs/butterfly.png");
}

function setup()
{
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB);
	heights = surface(n, off);
	hues = colorsH(heights);
	w = heights[0].length*sca;
	h = heights[1].length*sca;

	$.notify("welcome to theland 3D", "x")
}

function drawSun() 
{
	push();
		sunCt+=0.01;
		rotateY(sunCt);
		fill(200);
		stroke(0,0,255);
		translate(-width/6, -height/6, 0);
		texture(butterfly);
		sphere(50);
	pop();
}

function moveUp(times)
{
	off[0] -= times*speed*cos(th);
	off[1] -= times*speed*sin(th);
}

function moveDown(times)
{
	off[0] += times*speed*cos(th);
	off[1] += times*speed*sin(th);
}

function handleKeys()
{
	if (keyIsDown(65)) // a
	{
		th += 0.01;
	} 
	else if (keyIsDown(68)) // d
	{
		th -= 0.01;
	}

	if (keyIsDown(87)) // w
	{
		phi += 0.01;
	}
	else if (keyIsDown(83)) // s
	{
		phi -= 0.01;
	}

	if (keyIsDown(38)) // up arrow
	{
		moveUp(1);
	}
	else if(keyIsDown(40)) // down arrow
	{
		moveDown(1);
	}
}

function touchStarted()
{
	lastDownY = mouseY;
}

function touchEnded()
{
	if (mouseY < lastDownY)
	{
		moveDown(10);
	}
	else
	{
		moveUp(10);
	}
}

function handleTilted()
{
	let threshold = 10;
	if (deviceorientation == 'landscape')
	{
		$.notify("please rotate your phone");
	}
	if (angles[2] < -threshold)
	{
		th += 0.01;
	}
	else if (angles[2] > threshold)
	{
		th -= 0.01;
	}

	if (angles[1] < -threshold)
	{
		phi += 0.01;
	}
	else if (angles[1] > threshold)
	{
		phi -= 0.01;
	}

}

function draw()
{
	background(0);
	rotateX(0.9);
	
	drawSun();
	handleKeys();
	handleTilted();

	heights = surface(n, off);
	hues = colorsH(heights);

	ambientLight(0, 0, 255);

	push();
		rotateX(phi);
		rotateZ(th);

		translate(-w/2, -h/2, 0);
		noStroke();
		// stroke(0,0,0);
		// strokeWeight(0.5);
		for (let y = 0; y < heights.length-1; y++)
		{
			beginShape(TRIANGLE_STRIP);
			for (let x = 0; x < heights[y].length; x++)
			{
				fill(hues[y][x], 70, 99);
				vertex(x*sca, y*sca, heights[y][x]);
				vertex(x*sca, (y+1)*sca, heights[y+1][x]);
			}
			endShape();
		}
	pop();

}

// accelerometer Data
window.addEventListener('deviceorientation', function(e)
{
  angles[0] = e.alpha;
  angles[1] = e.beta;
  angles[2] = e.gamma;
  for (let i = 0; i < 3; i++)
  {
    if (!angles[i])
    {
      angles[i]=0;
    }
  }
});

