import { el, mount, List } from "redom";

export function formRegistration() {
  // Описываем интерфейс данных формы
  interface RegisterData {
    username: string;
    surname: string;
    email: string;
    password: string;
  }

  class RegistrationForm {
    el: HTMLElement;
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private nameInput: HTMLInputElement;
    surnameInput: HTMLInputElement;

    constructor() {
      // Создаем элементы с помощью функции el()
      this.el = el(
        "form.registration-form",
        {
          onsubmit: (e: Event) => this.handleSubmit(e),
        },
        el("h2", "Регистрация"),

        // Поле Имя
        (this.nameInput = el("input", {
          type: "name",
          placeholder: "Введите Ваше имя",
          required: true,
        }) as HTMLInputElement),
        // Поле Фамилия
        (this.surnameInput = el("input", {
          type: "surnames",
          placeholder: "Введите Вашу фамилию",
          required: false,
        }) as HTMLInputElement),
        // Поле Email
        (this.emailInput = el("input", {
          type: "email",
          placeholder: "Email",
          required: true,
        }) as HTMLInputElement),
        // Поле Пароль
        (this.passwordInput = el("input", {
          type: "password",
          placeholder: "Пароль",
          required: true,
        }) as HTMLInputElement),
        // Кнопка отправки
        el("button", { type: "submit" }, "Регистрация"),
      );
    }

    private handleSubmit(e: Event): void {
      e.preventDefault();

      const data: RegisterData = {
        email: this.emailInput.value,
        password: this.passwordInput.value,
        username: this.nameInput.value,
        surname: this.surnameInput.value,
      };

      console.log("Данные отправлены:", data);
      alert(`Аккаунт для ${data.email} успешно создан!`);
    }
  }

  // Монтируем форму в body (или любой другой элемент)
  const regForm = new RegistrationForm();

  // const appEl = document.getElementById("app");
  const appEl = el("#app", "");
  mount(document.body, appEl);
  mount(appEl, regForm);
}

// 1. Импортируем необходимые функции из redom
// import { el, mount, text, set } from 'redom';

// // 2. Определяем тип для данных формы (стейта)
// interface FormData {
//     username: string;
//     email: string;
//     password: string;
// }

// // 3. Создаем компонент формы
// function RegistrationForm() {
//     let formData: FormData = { username: '', email: '', password: '' };
//     let errorMessage = '';

//     // Создаем элементы
//     const usernameInput = el('input', { type: 'text', placeholder: 'Имя пользователя' });
//     const emailInput = el('input', { type: 'email', placeholder: 'Email' });
//     const passwordInput = el('input', { type: 'password', placeholder: 'Пароль' });
//     const submitButton = el('button', { type: 'submit' }, 'Зарегистрироваться');
//     const errorDisplay = el('div', { style: { color: 'red' } });

//     // Обработчик ввода данных
//     function handleInput(this: HTMLInputElement, event: Event) {
//         const { name, value } = event.target as HTMLInputElement;
//         formData = { ...formData, [name]: value };
//         // Обновляем ошибку при вводе (пример простой валидации)
//         if (name === 'password' && value.length < 6) {
//             errorMessage = 'Пароль должен быть длиннее 6 символов';
//         } else {
//             errorMessage = '';
//         }
//         updateView(); // Обновляем вид
//     }

//     // Обработчик отправки
//     function handleSubmit(event: Event) {
//         event.preventDefault(); // Предотвращаем стандартную отправку формы
//         if (formData.username && formData.email && formData.password && !errorMessage) {
//             console.log('Форма отправлена:', formData);
//             alert('Регистрация успешна!');
//             // Здесь можно отправить данные на сервер
//             formData = { username: '', email: '', password: '' }; // Очищаем форму
//             updateView();
//         } else {
//             errorMessage = 'Пожалуйста, заполните все поля корректно.';
//             updateView();
//         }
//     }

//     // Функция для обновления отображения
//     function updateView() {
//         set(usernameInput, { value: formData.username });
//         set(emailInput, { value: formData.email });
//         set(passwordInput, { value: formData.password });
//         set(errorDisplay, text(errorMessage));
//     }

//     // Собираем контейнер формы
//     const formContainer = el('form',
//         { onsubmit: handleSubmit },
//         errorDisplay,
//         el('div', { style: { margin: '10px 0' } }, usernameInput),
//         el('div', { style: { margin: '10px 0' } }, emailInput),
//         el('div', { style: { margin: '10px 0' } }, passwordInput),
//         submitButton
//     );

//     // Привязываем обработчики событий
//     usernameInput.addEventListener('input', handleInput);
//     emailInput.addEventListener('input', handleInput);
//     passwordInput.addEventListener('input', handleInput);

//     updateView(); // Инициализируем вид

//     return formContainer;
// }

// // 4. Монтируем форму в DOM
// const root = document.body; // Или другой элемент
// mount(root, RegistrationForm());
