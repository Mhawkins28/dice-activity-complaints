// ---- Edit these lists for other lessons ----

// Problems shown by "New problem"
const PROBLEMS = [
  "Your coffee is cold.",
  "Your order is wrong.",
  "Your new shoes are two different sizes.",
  "Your roommate's music is loud after midnight.",
  "Your delivery is an hour late.",
  "Your phone is still broken after the repair.",
  "There's a hair in your noodles.",
  "Your teammate didn't do their part of the project.",
];

// What each level adds
const LEVELS = {
  calm:  { name: "Calm",  add: "Start soft. Say the problem. Say what you want." },
  firm:  { name: "Firm",  add: "+ \"This is the second time I've asked.\"" },
  angry: { name: "Angry", add: "+ \"This is unacceptable. I'd like to speak to the manager.\"" },
};

// ---- No need to edit below ----

// Which of the 9 grid cells light up for each number (cells 0-8, left to right, top to bottom)
const FACES = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const die = document.getElementById("die");
const pips = die.querySelectorAll(".pip");
const levelEl = document.getElementById("level");
const addEl = document.getElementById("add");
const problemEl = document.getElementById("problem");

let rolling = false;
let lastProblem = -1;

function showFace(n) {
  pips.forEach((pip, i) => pip.classList.toggle("on", FACES[n].includes(i)));
}

function levelFor(n) {
  if (n <= 2) return "calm";
  if (n <= 4) return "firm";
  return "angry";
}

function randomFace() {
  return Math.floor(Math.random() * 6) + 1;
}

function roll() {
  if (rolling) return;
  rolling = true;
  die.classList.add("rolling");
  document.body.className = "";
  levelEl.textContent = "...";
  addEl.textContent = "Rolling!";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const spins = reduceMotion ? 1 : 12;
  let count = 0;

  const timer = setInterval(() => {
    showFace(randomFace());
    count++;
    if (count >= spins) {
      clearInterval(timer);
      const n = randomFace();
      showFace(n);
      const key = levelFor(n);
      document.body.className = key;
      levelEl.textContent = LEVELS[key].name;
      addEl.textContent = LEVELS[key].add;
      die.classList.remove("rolling");
      rolling = false;
    }
  }, 70);
}

function newProblem() {
  let i;
  do {
    i = Math.floor(Math.random() * PROBLEMS.length);
  } while (i === lastProblem && PROBLEMS.length > 1);
  lastProblem = i;
  problemEl.textContent = PROBLEMS[i];
}

die.addEventListener("click", roll);
document.getElementById("rollBtn").addEventListener("click", roll);
document.getElementById("problemBtn").addEventListener("click", newProblem);

document.addEventListener("keydown", (e) => {
  // Space always rolls, even if a button has focus (Enter still presses the focused button)
  if (e.key === " ") { e.preventDefault(); roll(); }
  if (e.key === "p" || e.key === "P") newProblem();
});

showFace(6);
