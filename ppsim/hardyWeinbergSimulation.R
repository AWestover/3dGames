# Alek Westover
# Evolution simulation

# only looking at 1 allele A / a
# aa is lethal

# N is population size (even for simplicity of mating)
# population <- c(number of AA, number of Aa)

nextGeneration <- function(population, N) {
  newPopulation <- c(0, 0)
  idxs <- sample(1:N)
  for (i in 1:(N/2)) {
    # 2*i-1, 2*i mate twice
    mate1 <- idxs[2*i-1]
    mate2 <- idxs[2*i]
    for (k in 1:2){
      if (mate1 <= population[1] && mate2 <= population[1]) { # both AA
        newPopulation[1] <- newPopulation[1]+1
      }
      else if ((mate1 > population[1] && mate2 <= population[1]) || (mate1 <= population[1] && mate2 > population[1])) { # AA cross Aa
        if(runif(1)<1/2)
        {
          newPopulation[1] <- newPopulation[1] + 1;
        }
        else {
          newPopulation[2] <- newPopulation[2] + 1;
        }
      }
      else { # both Aa 
        if(runif(1)<1/3)
        {
          newPopulation[1] <- newPopulation[1] + 1;
        }
        else {
          newPopulation[2] <- newPopulation[2] + 1;
        }
      } 
    }
  }
  return (newPopulation)
}

simulatePopulation <- function(generations, N) {
  population <- c(0, N)
  AAs <- numeric(generations)
  Aas <- numeric(generations)
  for (g in 1:generations) {
    AAs[g] <- population[1]
    Aas[g] <- population[2]
    population <- nextGeneration(population, N);
  }
  AAs[g] <- population[1]
  Aas[g] <- population[2]
  plot(x=NULL, y=NULL, xlim=c(0,N),ylim=c(0,N))
  lines(Aas, col='green')
  lines(AAs, col='red')
  abline(h=mean(AAs))
  abline(h=mean(Aas))
  print(min(Aas))
}

simulatePopulation(300, 1000)


# OK, this model below is probably wrong, because it gives a different result than I had previously
# need to think about the counting problem more...
# Expected number of AAs (x) on the next generation <- 
# number of AA * expected AA offspring per AA which is (pr(AA mate AA) * pr (AA given AA mate AA) + pr(AA mate Aa) * pr(AA given AA mate Aa)) 
  return ((x^2 + x*y + (y^2) / 3)/ N );
# + number of Aa * expected AA offspring per Aa which is ... similar expression as above
E <- function(x, y, N) {
}
# to see what conditions cause complete convergence, we
# need to solve E(x, y) = x subject to constraint x+y = N
# could use Newton's method, but will not
# simpler to pluf 
# y = N - x into E(x, y)
EsubxParam <- function(x, N) {
  return (((x^2 + x*(N-x) + ((N-x)^2) / 3)/N) - x)
}
N <- 1000
xs <- 0:1000
plot(xs, EsubxParam(xs, N))
abline(h=0)

# weird: only stabilizes when x=N

