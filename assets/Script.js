nekena
const paragraph = [
    "apple", "banana", "grape", "orange", "cherry"
];

const typingText = document.querySelector(".typing-text p")
const inField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpn span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeleft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph(){;
    const ranIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelector("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inField.focus());
    typingText.addEventListener("click", () => inField.focus());
}
