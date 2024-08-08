import createElement from '../../assets/lib/create-element.js';
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.renderTable(rows);
    this.checkDelete();
  }

  renderTable(rows) {
    this.elem = createElement(`
      <table>
        <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
        </thead>
      </table>
    `);
    const tBody = document.createElement('tbody');

    rows.forEach((item) => {
      const trBody = document.createElement('tr');
      trBody.innerHTML = `
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.salary}</td>
      <td>${item.city}</td>
      <td><button>X</button></td>
      `;
      tBody.append(trBody);
    });
    this.elem.append(tBody);
  }

  checkDelete() {
    this.elem.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches('button')) {
        const elementTr = target.closest('tr');
        elementTr.remove();
      }
    });
  }
}