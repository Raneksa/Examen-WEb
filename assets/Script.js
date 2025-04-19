const typingText = document.querySelector(".text p");
const inpField = document.querySelector(".Case");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const modeSelector = document.getElementById("mode");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let defaut = "easy";

const phrase = {
    easy: [
        "Le chat dort sur le canapé pendant que je visionne les videos de Dr Toky."
    ],
    medium: [
        "L'assistant Web1 JEAN MARC corrige nos TD avec grande Envergure."
    ],
    hard: [
        "Extravaguant,Modelisée,Mise en evidence."
    ]
};

function loadPhrase() {
     const selectedPhrases = phrase[defaut];
        const ranIndex = Math.floor(Math.random() * selectedPhrases.length);
    typingText.innerHTML = "";
    selectedPhrases[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    const Tapée = inpField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (Tapée == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText === Tapée) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        wpmTag.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    } else {
        clearInterval(timer);
    }
}

function Refaire() {
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    isTyping = false;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    loadPhrase();
}

modeSelector.addEventListener("change", () => {
    defaut = modeSelector.value;
    Refaire();
});

loadPhrase();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", Refaire);
