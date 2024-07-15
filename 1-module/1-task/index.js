function factorial(n) {
  let w = 1;
  while (n != 0){
    w=n*w;
    n=n-1;
  }
  return w;
}
