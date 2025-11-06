// --- Quotes + typing animation ---
const quotes = [
  "One step at a time — let’s make today count.",
  "Write, reflect, and reset your day.",
  "Plan your day wisely."
];

const quoteElement = document.getElementById("quote");
let quoteIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = quotes[quoteIndex];

  if (!deleting) {
    quoteElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 4000); // wait before erase
      return;
    }
  } else {
    quoteElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      quoteIndex = (quoteIndex + 1) % quotes.length;
    }
  }
  setTimeout(typeEffect, deleting ? 40 : 80);
}
typeEffect();

// --- Background rotation ---
const backgrounds = [
  "images/bg1.jpg",
  "images/bg2.jpg",
  "images/bg3.jpg",
  "images/bg4.jpg",
  "images/bg5.jpg",
  "images/bg6.jpg",
  "images/bg7.jpg",
  "images/bg8.jpg"
];

let bgIndex = 0;
const bg = document.querySelector(".background");

function changeBackground() {
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
    bg.style.opacity = 1;
    bgIndex = (bgIndex + 1) % backgrounds.length;
  }, 1500);
}
changeBackground();
setInterval(changeBackground, 40000); // every 2 minutes

// --- To-Do functionality ---
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", addTask);

function addTask() {
  if (inputBox.value.trim() === '') return;

  let li = document.createElement("li");
  li.textContent = inputBox.value;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", e => {
  if (e.target.tagName === "LI") e.target.classList.toggle("checked");
  else if (e.target.tagName === "SPAN") e.target.parentElement.remove();
  saveData();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();
