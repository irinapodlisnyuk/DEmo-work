import JustValidate from "just-validate";
import { Rules } from "just-validate";
import { loadTracks } from "../ts/tableList/loadTracks";

export function validateSearch() {
  const input = document.querySelector<HTMLInputElement>("#search-input");
  const btn = document.querySelector(".custom-input__btn");
  if (!input) return;

  const originalPlaceholder = input.placeholder;
  const validate = new JustValidate(".header__form", {
    errorLabelStyle: { display: "none" }, // Чтобы ничего не вылезало в верстке
  });

  // 1. Добавляем правила
  validate.addField("#search-input", [
    { rule: "required" as Rules, errorMessage: "Введите запрос поиска" },
    { rule: "minLength" as Rules, value: 3, errorMessage: "Слишком коротко" },
  ]);

  // 2. Если валидация не прошла
  validate.onFail((fields) => {
    const field = fields["#search-input"];
    if (field) {
      const errorText = field.errorMessage || "Ошибка";

      input.value = "";
      input.placeholder = String(errorText);
      input.classList.add("input-error");
    }
  });

  // 3. Сброс ошибки при вводе
  input.addEventListener("input", () => {
    input.placeholder = originalPlaceholder;
    input.classList.remove("input-error");

    loadTracks(); 
  });

  // 4. Ручной запуск по клику на твою кнопку
  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    validate.revalidate();
  });

  validate.onSuccess(() => console.log("Ищем:", input.value));
}
