function sumSalary(salaries) {
  let sum = 0;
  for(let needed in salaries) {
    if (typeof salaries[needed] === "number" && !isNaN(salaries[needed]) && salaries[needed] != Infinity && salaries[needed] != -Infinity)
        sum += salaries[needed];          
}
return sum;
  }


