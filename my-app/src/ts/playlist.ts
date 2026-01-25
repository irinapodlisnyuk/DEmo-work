import { el, list, mount } from 'redom';

// export function playList() {

// const container = document.getElementById("tracks-tbody") as HTMLElement;


// // 1. Компонент строки (Row)
// class TableRow {
//   constructor() {
//     this.el = el('tr',
//       this.id = el('td'),
//       this.name = el('td'),
//       this.value = el('td')
//     );
//   }
//   update(data) {
//     this.id.textContent = data.id;
//     this.name.textContent = data.name;
//     this.value.textContent = data.value;
//   }
// }

// // 2. Компонент таблицы (Table)
// class Table {
//   constructor() {
//     this.el = el('table',
//       el('thead',
//         el('tr', el('th', 'ID'), el('th', 'Имя'), el('th', 'Значение'))
//       ),
//       this.tbody = list('tbody', TableRow) // Используем list для массива
//     );
//   }
//   update(data) {
//     this.tbody.update(data); // Обновление строк
//   }
// }

// // 3. Использование
// const table = new Table();
// mount(document.body, table);

// // 4. Получение данных с сервера
// fetch('/api/data')
//   .then(response => response.json())
//   .then(data => {
//     table.update(data); // Передача данных в таблицу
//   });

//}
