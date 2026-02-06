import { validateForm } from "../validate/validateForm";
import { sendAuthRequest } from "../ts/authApi";
import { navigate } from "../ts-index/navigate";

jest.mock("../ts/authApi");
jest.mock("../ts-index/navigate");

describe("validateForm simple", () => {
  // Выносим создание формы в короткую функцию-хелпер
  const setupForm = (className: string) => {
    document.body.innerHTML = `
      <form class="${className}">
        <input id="username" name="username" value="test">
        <input id="password" name="password" value="123456">
      </form>`;
    return document.querySelector(`.${className}`) as HTMLFormElement;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it('Успешная регистрация', async () => {
    const form = setupForm('form__reg');
    (sendAuthRequest as jest.Mock).mockResolvedValue({ ok: true, data: { message: 'Ok' } });

    validateForm('.form__reg');
    form.dispatchEvent(new Event('submit')); 

    await new Promise((r) => setTimeout(r, 0));

    expect(navigate).toHaveBeenCalledWith('login');
    expect(window.alert).toHaveBeenCalledWith('Ok');
  });

  it("Успешный логин", async () => {
    const form = setupForm("form__login");
    (sendAuthRequest as jest.Mock).mockResolvedValue({
      ok: true,
      data: { token: "123" },
    });

    validateForm(".form__login");
    form.dispatchEvent(new Event("submit"));

    await new Promise(setImmediate);

    expect(localStorage.getItem("token")).toBe("123");
  });
});
