"use strict";

const form = document.getElementById("tip-form");
const tipButtons = document.querySelectorAll(".presets button");
const result = document.getElementById("result");
const themeToggle = document.getElementById("theme-toggle");
const tipInput = document.getElementById("tip-percentage");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    tipButtons.forEach((desactiveBtn) =>
      desactiveBtn.classList.remove("active")
    );
    tipButton.classList.add("active");
    tipInput.value = tipButton.dataset.tip;
  });
});

tipInput.addEventListener("keydown", (event) => {
  const key = event.key;
  const isDelete = key === "Backspace" || key === "Delete";
  const isNumber = /^[0-9]$/.test(event.key);

  if (isDelete || isNumber) {
    tipButtons.forEach((desactiveBtn) =>
      desactiveBtn.classList.remove("active")
    );
  }
});

function calculateTip(bill, tipPercent, people) {
  const totalTip = (bill * tipPercent) / 100;
  const perPerson = totalTip / people;
  return {
    totalTip: totalTip.toFixed(2),
    perPerson: perPerson.toFixed(2),
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const bill = parseFloat(form.bill.value);
  const tipPercent = parseFloat(form.tip.value);
  const people = parseInt(form.people.value, 10);

  if ([bill, tipPercent, people].some((value) => isNaN(value) || value <= 0)) {
    result.textContent =
      "Introduce valores validos, numeros enteros mayores a 0";
    return;
  }

  const { totalTip, perPerson } = calculateTip(bill, tipPercent, people);
  result.textContent = `Propina total: €${totalTip} — €${perPerson} por persona`;
});

form.addEventListener("reset", () => {
  result.textContent = "";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
});
