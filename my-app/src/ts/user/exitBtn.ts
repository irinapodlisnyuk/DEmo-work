export function exitBtn() {
  const exitBtn = document.querySelector(".user-card__exit") as HTMLElement;
  exitBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear(); 
    window.location.href = "index.html"; 
  });
}
