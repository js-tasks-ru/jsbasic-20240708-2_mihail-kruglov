function highlight(table) {
  let tableRows = table.rows;

  for (let i = 1; i < tableRows.length; i++) {
    let string = tableRows[i];



    if (string.cells[3].dataset.available === 'true') {
      string.classList.add('available');
    } 
    else if (string.cells[3].dataset.available === 'false') {
      string.classList.add('unavailable');
    } 
    else {
      string.hidden = true;
    }



    if (string.cells[2].textContent === 'm') {
      string.classList.add('male');
    } 
    else {
      string.classList.add('female');
    }



    if (string.cells[1].textContent < 18) {
      string.style = 'text-decoration: line-through';
    }
  }
}
