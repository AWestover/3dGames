/*
Weights: x, y, x+w, y+h, speed, bias
*/


class Dino
{

  constructor(x, y, weights, fitness)
  {
    this.cpic = 0;
    this.base_pos = createVector(x, y);
    this.cur_y = y;
    this.y_vel = 0;

    this.was_xin_yout = false;

    this.obstaclesCleared = 0;

    if (weights) {
      this.weights = weights; // irrelevant if it is user controlled...
    }
    else
    {
      this.weights = this.randomInitWeights();
    }

    // fitness will increase every time step you stay alive?
    this.fitness = fitness || 0; // start the good ones out with some fitness...

    this.dims = createVector(image_dims[0], image_dims[1]);
  }

  reset()
  {
    this.obstaclesCleared = 0;
  }

  show()
  {
    if (!drawGoodOnly || this.fitness != 0)
    { 
      text(":"+this.fitness, this.base_pos.x, this.cur_y-20);
      image(pictures[int(this.cpic)], this.base_pos.x, this.cur_y);
    }
  }

  altPic()
  {
    this.cpic = (this.cpic + picSpeed) % pictures.length;
  }

  update()
  {
    this.altPic();

    if(this.base_pos.y <= this.cur_y + this.y_vel)
    {
      this.y_vel = 0;
      this.cur_y = this.base_pos.y;
    }
    else {
      this.cur_y += this.y_vel;
      this.applyGravity();
    }

  }

  applyGravity()
  {
    if (this.base_pos.y > this.cur_y)
    {
      this.y_vel -= gravity;
    }
  }


  isJumping()
  {
    return ((this.y_vel != 0) || (this.base_pos.y > this.cur_y));
  }

  jump()
  {
    if (!this.isJumping())
    {
      this.y_vel = -jumpv;
      return true;
    }
    else {
      return false;
    }
  }

  checkCollisions(game)
  {
    // for now...
    // for (let i = 0; i < game.obstacles.length; i++)
    // {
    // only need to check the first obstacle 
    let i = 0;
      if (game.obstacles[i].collisionX(this.base_pos.x, this.dims))
      {
        if (game.obstacles[i].collisionAboveY(this.cur_y, this.dims))
        {
          this.was_xin_yout = false;
          return true;
        }
        else
        {
          this.was_xin_yout = true;
        }
      }
      else
      {
        if (this.was_xin_yout)
        {
          this.was_xin_yout = false;
          this.obstaclesCleared += 1;
        }
      }
    // }
    return false;
  }

  sigmoid(xs)
  {
    let tt = 0;
    this.weights[1] = 0; this.weights[2] = 0; this.weights[3] = 0; //this.weights[4]=0;//for testing
    for (let i = 0; i < this.weights.length-1; i++)
    {
      tt += xs[i]*this.weights[i];
    }
    tt += this.weights[this.weights.length-1]; //bias
    return (1 / (1 + Math.pow(Math.E, -tt)) );
  }

  jumpPrediction(state, normFactors)
  {
    // run state through neural network with this guys weights
    return this.sigmoid(this.normalize(state, normFactors)) > 0.5;
  }


  //normalize is not perfect, but it is OK.... not strict -1 to 1
  normalize(state, normFactors)
  {
    let x = [];
    for (let i = 0; i < state.length; i++)
     {
      x.push(2*state[i]/normFactors[i]-1);
    }
    return x;
  }

  // random initialization for begining
  randomInitWeights()
  {
    let o = [];
    for (let i = 0; i < NUMWEIGHTS; i++)
    {
      o.push(2*(Math.random()-0.5));
    }
    return o;
  }

  bestWeights()
  {
    return [-0.9967631346888561, 0, 0, 0, -0.04494619018908397, -0.2940566796223254]
  }

  // used in evolution step
  mutateWeights()
  {
    for (let weight in this.weights)
    {
      if (Math.random()<MUTATEPR)
      {
        this.weights[weight] += randomGaussian(0, 0.2);
      }
    }
    return this.weights;
  }

}
