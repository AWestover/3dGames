
/*
https://codepen.io/blackjak231/pen/XJmBQv

think about it a bit more before just looking at what they do though...


*/

function mutateColor(c)
{
  return color(hue(c)*0.2+0.8*random(), saturation(c), brightness(c));
}

class Lightning {
  constructor(rootPos)
  {
    this.pos = rootPos;
    this.childs = [];
    this.color = color(random()*255, random()*255, random()*255);
  }

  display()
  {
    stroke(this.color);
    for (let c in this.childs)
    {
      line(this.pos.x, this.pos.y, this.childs[c].pos.x, this.childs[c].pos.y);
      this.childs[c].display();
    }
  }

  addChild(childPos)
  {
    let nl = new Lightning(childPos);
    this.childs.push(nl);
    return nl;
  }

  addRandomBranch(n)
  {
    let eps = 0.4
    let th = random(0-eps, PI/2+eps);
    let mag = n*randomGaussian(1,0.1);
    let delta = createVector(mag*cos(th), mag*sin(th));
    return this.addChild(p5.Vector.add(delta, this.pos));
  }

  addPath(size, len)
  {
    if (len>0)
    {
      let nc = this.addRandomBranch(size);
      nc.addPath(size*0.95, len-1);
    }
  }

  addPathSomewhere(size, len, pr)
  {
    if (random() < pr)
    {
      this.addPath(size, len);
    }
    else {
      if (this.childs.length > 0)
      {
        this.childs[int(random()*this.childs.length)].addPathSomewhere(size, len, pr);
      }
    }
  }

  propColor(col)
  {
    this.color = mutateColor(col);
    for (let i in this.childs)
    {
      let cchild = this.childs[i];
      setTimeout(function(){cchild.propColor(col)}, 0.9);
    }
  }

  killChilds(pr)
  {
    if (random() < pr)
    {
      this.childs = [];
    }
    else {
      for (let i in this.childs)
      {
        this.childs[i].killChilds(pr);
      }
    }
  }

  maxLength()
  {
    let ml = 0;
    for (let c in this.childs)
    {
      let cml = this.childs[c].maxLength();
      if (cml > ml)
      {
        ml = cml;
      }
    }
    return ml+1;
  }

}

let ct = 0;
let l;

function setup()
{
  let cnv = createCanvas(windowWidth*0.8, windowHeight*0.8);

  l = new Lightning(createVector(0,0));

  let cl = l;
  for (let i = 0; i < 70; i++)
  {
    cl = cl.addRandomBranch(30*random());
  }
  for (let i = 0; i < 30; i++)
  {
    l.addPathSomewhere(80, 5, 0.05);
  }

  colorMode(HSB, 1);
}

function draw()
{
  background(0,0,0);
  l.display();
  ct += 1;

  if (ct % 100 == 0)
  {
    l.propColor(color(random(), random()*0.5+0.5, random()*0.5+0.5));
  }
  if (ct % 10 == 0)
  {
    l.killChilds(0.1);
    for (let i = 0; i < 10; i++)
    {
      l.addPathSomewhere(80, 14, 0.2);
    }
    while (l.maxLength() < 5)
    {
      l.addPath(10, 2);
      l.addPathSomewhere(40, 2, 0.2);
    }
  }
}
