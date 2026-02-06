import { validateSearch } from "../validate/validateSearch"; // путь к вашему файлу
import * as trackLoader from "../ts/tableList/loadTracks";

// Мокаем функцию загрузки треков
jest.mock("../ts/tableList/loadTracks", () => ({
  loadTracks: jest.fn(),
}));

describe("validateSearch()", () => {
  beforeEach(() => {
    // Создаем разметку формы перед каждым тестом
    document.body.innerHTML = `
      <form class="header__form">
        <input id="search-input" placeholder="Search..." />
        <button class="custom-input__btn">Find</button>
      </form>
    `;
    validateSearch();
  });

  it("должен показать ошибку, если поле пустое", () => {
    const input = document.querySelector("#search-input") as HTMLInputElement;
    const btn = document.querySelector(
      ".custom-input__btn",
    ) as HTMLButtonElement;

    btn.click();

    expect(input.placeholder).toBe("Введите запрос поиска");
    expect(input.classList.contains("input-error")).toBe(true);
  });

  it("должен показать ошибку, если введено меньше 3 символов", () => {
    const input = document.querySelector("#search-input") as HTMLInputElement;
    const btn = document.querySelector(
      ".custom-input__btn",
    ) as HTMLButtonElement;

    input.value = "Lo"; // 2 символа
    btn.click();

    expect(input.placeholder).toBe("Слишком коротко");
    expect(input.classList.contains("input-error")).toBe(true);
  });

  it("должен вызвать loadTracks при успешной валидации", () => {
    const input = document.querySelector("#search-input") as HTMLInputElement;
    const btn = document.querySelector(
      ".custom-input__btn",
    ) as HTMLButtonElement;

    input.value = "Linkin Park";
    btn.click();

    // Проверяем, что функция загрузки была вызвана
    expect(trackLoader.loadTracks).toHaveBeenCalled();
  });

  it("должен сбрасывать стили ошибки при вводе текста", () => {
    const input = document.querySelector("#search-input") as HTMLInputElement;

    input.classList.add("input-error");
    input.dispatchEvent(new Event("input"));

    expect(input.classList.contains("input-error")).toBe(false);
    expect(input.placeholder).toBe("Search..."); // исходный placeholder
  });

  it("Возвращаем false, если был передан скрипт", () => {
    const input = document.querySelector("#search-input") as HTMLInputElement;
    const btn = document.querySelector(
      ".custom-input__btn",
    ) as HTMLButtonElement;

    input.value = '<script>alert("hack")</script>';
    btn.click();

    expect(input.classList.contains("input-error")).toBe(false);
  });
});
