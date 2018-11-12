for file in *.png; 
  do 
    convert $file -flop $file; 
  done
