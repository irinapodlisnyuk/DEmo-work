import { navigate } from "./navigate";
import { RegisterData } from "./types";
import { el, setChildren } from "redom"; // Убедитесь, что импортируете el
import { validateForm } from "../validate/validateForm";

// private handleSubmit(e: Event): void {
//   e.preventDefault();
//   const data: RegisterData = {
//     email: this.emailInput.value,
//     password: this.passwordInput.value,
//     username: this.nameInput.value,
//     surname: this.surnameInput.value,
//   };

// // 1. Успешная проверка (например, поля не пустые)
// if (this.emailInput.value && this.passwordInput.value) {
//   console.log("Данные верны. Переход в кабинет ...");

//   // 2. Переход на физическую страницу main.html
//   window.location.href = "main.html";
// } else {
//     validateForm();
//   //alert("Пожалуйста, введите логин и пароль");
// }

//     console.log("Данные отправлены:", data);
//     alert(`Аккаунт для ${data.email} успешно создан!`);
//     navigate("login"); // Перенаправляем на логин после успеха
//   }

export default function createRegCard(containerEl: HTMLElement) {
  class RegistrationForm {
    el: HTMLElement;

    constructor() {
      this.el = el("form.form__reg", { autocomplete: "on" }, [
        // Оборачиваем каждый вход в группу, чтобы ошибка выводилась ровно ПОД ним
        el(".form__group", [
          el("input.custom-input#name", {
            name: "username",
            type: "text",
            placeholder: "Имя",
            autocomplete: "name",
          }),
        ]),

        // el(".form__group", [
        //   el("input.custom-input#surname", {
        //     type: "text",
        //     placeholder: "Фамилия",
        //     autocomplete: "family-name",
        //   }),
        // ]),

        el(".form__group", [
          el("input.custom-input#email", {
            name: "email",
            type: "email",
            placeholder: "Email",
            autocomplete: "email",
          }),
        ]),

        el(".form__group", [
          el("input.custom-input#password", {
            name: "password",
            type: "password",
            placeholder: "Пароль",
            autocomplete: "current-password",
          }),
        ]),

        el("button.card__btn", { type: "submit" }, "Зарегистрироваться"),
      ]);
    }
  }

  const cardTitle = el("h2.card__title", "Регистрация");
  const regForm = new RegistrationForm();

  // Кнопки навигации
  const homeLinkEl = el("a.card__link", { href: "#" }, "На главную");
  const loginLinkEl = el("a.card__link", { href: "#" }, "Вход");
  homeLinkEl.onclick = (e) => {
    e.preventDefault();
    navigate("home");
  };
  loginLinkEl.onclick = (e) => {
    e.preventDefault();
    navigate("login");
  };

  const divCardEl = el(".card", [
    cardTitle,
    regForm.el,
    el(".card__wrapper", [homeLinkEl, loginLinkEl]),
  ]);

  containerEl.innerHTML = "";
  containerEl.append(divCardEl);

  // Инициализация валидации
  validateForm(".form__reg");
}
