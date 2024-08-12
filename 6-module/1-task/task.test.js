export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement("table");
    this.elem.innerHTML = `<thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>`;
    this.addTable = document.createElement("tbody");
    rows.map((person) => {
      let newLine = document.createElement("tr");
      newLine.innerHTML = `
        <td>${person.name}</td>
        <td>${person.age}</td>
        <td>${person.salary}</td>
        <td>${person.city}</td>
        <td><button>X</button></td>`;
      this.addTable.append(newLine);
    });
    this.elem.append(this.addTable);
    this.addTable.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        this.delete(event.target);
      }
    });
  }
  delete(item) {
    item.closest("tr").remove();
  }
}