class Obstacle
{

  constructor(pos, dims)
  {
    this.pos = pos;
    this.dims = dims;
  }

  isPast(x)
  {
    return (this.pos.x+ this.dims.x) < x;
  }

  getState()
  {
    return [this.pos.x, this.pos.y, this.pos.x+this.dims.x, this.pos.y+this.dims.y];
  }

  getNormFactors()
  {
    // yes I know image_dims is wrong just work with it for now...
    return [screen_dims[0], screen_dims[1], screen_dims[0]+image_dims[0], screen_dims[1]+image_dims[1]];
  }

  show()
  {
    rect(this.pos.x, this.pos.y, this.dims.x, this.dims.y);
  }

  shouldDie()
  {
    return (this.pos.x < 0);
  }

  update(speed)
  {
    this.pos.x -= speed;
    if (this.pos.x < screen_dims[0])
    {
      this.show();
    }
  }

  // is there a collision between this obstacle and another rectangle
  collision(otherPos, otherDims)
  {
    let xl = (otherPos.x <= (this.pos.x+this.dims.x));
    let xr = ((otherPos.x + otherDims.x) >= this.pos.x);
    let xIn = (xr && xl);

    let yl = (otherPos.y <= (this.pos.y+this.dims.y));
    let yr = ((otherPos.y + otherDims.y) >= this.pos.y);
    let yIn = (yr && yl);

    return (xIn && yIn);
  }

  collisionX(otherPosx, otherDims)
  {
    let xl = (otherPosx <= (this.pos.x+this.dims.x));
    let xr = ((otherPosx + otherDims.x) >= this.pos.x);
    return (xl && xr);
  }

  // you know that there is not a collision from below (just the y part no x)
  collisionAboveY(otherPosy, otherDims)
  {
    return ((otherPosy + otherDims.y) >= this.pos.y); 
  }

}
