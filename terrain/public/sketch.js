
let th = 0;
let off = 0;
const sca = 5;
let heights; //= [[100, 90, 80], [90, 90, 80], [80, 80, 80]];
let hues;
let w, h;
const n = 40;
let butterfly;

function preload()
{
	butterfly = loadImage("butterfly1.png");
}

function setup()
{
	createCanvas(256, 256, WEBGL);
	colorMode(HSB);
	heights = surface(n, off);
	hues = colorsH(heights);
	w = heights[0].length*sca;
	h = heights[1].length*sca;
}

function draw()
{
	background(0);
	rotateX(0.9);
	
	push();
	th+=0.01;
	rotateY(th);
	fill(200);
	stroke(0,0,255);
	translate(-width/3, -height/3, 0);
	texture(butterfly);
	box(50);
	pop();

	heights = surface(n, off);
	hues = colorsH(heights);
	off += 0.01;

	ambientLight(0, 0, 255);

	push();
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

	th += 0.01;

}
