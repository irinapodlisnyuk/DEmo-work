import JustValidate from "just-validate";
import { navigate } from "../ts-index/navigate";
import { regRules, loginRules } from "./validationRules";
import { sendAuthRequest } from "../ts/authApi";

export function validateForm(formSelector: string): void {
  const form = document.querySelector<HTMLFormElement>(formSelector);
  if (!form) return;

  const validate = new JustValidate(form);
  const isReg = formSelector === ".form__reg";
  
  // Применяем нужный конфиг
  const rules = isReg ? regRules : loginRules;
  Object.entries(rules).forEach(([id, rulesList]) => {
    validate.addField(id, rulesList);
  });

  validate.onSuccess(async (event) => {
    event?.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const apiUrl = isReg ? "/api/register" : "/api/login";

    try {
      const { ok, data } = await sendAuthRequest(apiUrl, formData);

      if (ok) {
        if (isReg) {
          alert(data.message);
          navigate("login");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", String(formData.username || formData['login-username']));
          window.location.href = "main.html";
        }
      } else {
        alert(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  });
}

