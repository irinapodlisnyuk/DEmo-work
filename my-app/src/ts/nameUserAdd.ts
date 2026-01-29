
export function nameUser() {
  const userNameEl = document.querySelector<HTMLElement>(".header__user-text");
  const savedName = localStorage.getItem("username");

  if (userNameEl && savedName) {
    userNameEl.textContent = savedName;
  }

}