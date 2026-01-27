import { navigate } from "./navigate";
import { RegisterData  } from "./types";
import { el,  setChildren } from "redom"; // Убедитесь, что импортируете el

export default function createRegCard(containerEl: HTMLElement) {

  class RegistrationForm {
    el: HTMLElement;
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private nameInput: HTMLInputElement;
    private surnameInput: HTMLInputElement;

    constructor() {
      // Создаем элементы. В Redom вторым аргументом идет объект свойств.
      this.el = el("form.form-registration", {
          onsubmit: (e: Event) => this.handleSubmit(e),
        },
        [
          (this.nameInput = el("input.custom-input", {
            type: "text", // Типа "name" не существует, используйте "text"
            placeholder: "Имя",
            required: true,
          }) as HTMLInputElement),

          (this.surnameInput = el("input.custom-input", {
            type: "text", // Типа "surnames" не существует
            placeholder: "Фамилия",
          }) as HTMLInputElement),

          (this.emailInput = el("input.custom-input", {
            type: "email",
            placeholder: "Email",
            required: true,
          }) as HTMLInputElement),

          (this.passwordInput = el("input.custom-input", {
            type: "password",
            placeholder: "Пароль",
            required: true,
          }) as HTMLInputElement),

          el("button.card__btn", { type: "submit" }, "Зарегистрироваться"),
        ]
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
      navigate("login"); // Перенаправляем на логин после успеха
    }
  }

  // 1. Создаем заголовок
  const cardTitle = el("h2.card__title", "Регистрация");

  // 2. Инициализируем форму (берем regForm.el, так как это экземпляр класса)
  const regForm = new RegistrationForm();

  // 3. Создаем ссылки
  const homeLinkEl = el("a.card__link", { href: "#" }, "На главную");
  const loginLinkEl = el("a.card__link", { href: "#" }, "Вход");

  // Важно: вызывайте navigate с аргументом или без, согласно логике navigate.ts
  homeLinkEl.onclick = (e) => { e.preventDefault(); navigate("home"); };
  loginLinkEl.onclick = (e) => { e.preventDefault(); navigate("login"); };

  const divWrapCardEl = el(".card__wrapper", [homeLinkEl, loginLinkEl]);
  const divCardEl = el(".card");

  // 4. Используем setChildren правильно
  // Мы передаем regForm.el (узел DOM), а не сам объект класса
  setChildren(divCardEl, [cardTitle, regForm.el, divWrapCardEl]);
  
  // 5. Очищаем контейнер перед добавлением (если navigate этого не сделал)
  containerEl.append(divCardEl);
}