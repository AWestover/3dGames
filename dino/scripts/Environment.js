// environment variables

const rhh = 10; //dividing line height
const fr = 60;
const image_dims = [75, 100];

let drawGoodOnly = false;

let easy = false;
let x = prompt("easy?");
if (x == "easy")
{
	easy = true;
}
let acceleration; let gravity;
let jumpv; let obstw; let obsth;
let xOffObs;
if (easy)
{
	acceleration = 0.0000001;
	gravity = -0.6*2;
	jumpv = 12*2.2;
	obstw = {"mu": 20, "sigma": 1};
	obsth = {"mu": 20, "sigma": 1};
	xOffObs = 1200;
}
else
{
	acceleration = 0.002;
	gravity = -0.6*2;
	jumpv = 12*1.7;
	obstw = {"mu": 30, "sigma": 7};
	obsth = {"mu": 50, "sigma": 7};
	xOffObs = 500;
}

let pictures;
let screen_dims;

const numComps = 100;
const startSpeed = 6;
const picSpeed = 0.2;

let dino;
let dinoGame;
let dinoPos;

// genetic evolution on these guys...
let comps;
let compsGame;
let compsPos;

let deadComps = [];

const NUMWEIGHTS = 6;
const MUTATEPR = 0.8;
