function getMinMax(str) {
  let array = str.split(/[ ,]+/);
 
  let minnumber = +array[0];
  let maxnumber = minnumber;
  for (let x = 0; x < array.length; x++) {
    let e = +array[x];
    if (e < minnumber) minnumber = e;
    if (e > maxnumber) maxnumber = e;
  }
  return {min: minnumber, max: maxnumber};
}
