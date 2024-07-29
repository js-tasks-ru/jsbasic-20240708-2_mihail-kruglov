function makeDiagonalRed(table) 
{
  let rowsLength = table.rows.length;
  let rows = table.rows;
  for (let i = 0; i < rowsLength; i++) 
    {
    let string = rows[i];
    string.cells[i].style = 'background-color: red;';
  }
}
