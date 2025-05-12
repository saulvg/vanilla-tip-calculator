"use strict";

const form = document.getElementById("tip-form");
const tipButtons = document.querySelectorAll(".presets button");
const result = document.getElementById("result");
const themeToggle = document.getElementById("theme-toggle");
const tipInput = document.getElementById("tip-percentage");
const body = document.body;

//cambio de tema entre oscuro y claro
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

//Si se toca otro boton de propina se le aplica el estilo a ese boton y se le quita a otro que posiblemente lo tenga
tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    tipButtons.forEach((desactiveBtn) =>
      desactiveBtn.classList.remove("active")
    );
    tipButton.classList.add("active");
    tipInput.value = tipButton.dataset.tip;
  });
});

//Si el input se ve modificado se borra la clase qeu marca al boton de la propina
tipInput.addEventListener("keydown", (event) => {
  const key = event.key;
  const isDelete = key === "Backspace" || key === "Delete";
  const isNumber = /^[0-9]$/.test(e.key);

  if (isDelete || isNumber) {
    tipButtons.forEach((desactiveBtn) =>
      desactiveBtn.classList.remove("active")
    );
  }
});

//Reincio el formulario y la clase de los botones
form.addEventListener("reset", () => {
  result.textContent = "";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
});
