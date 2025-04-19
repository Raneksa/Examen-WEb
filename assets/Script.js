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

function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typedChar = inField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeleft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }else{
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpn = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeleft) * 60);
        wpn = wpn < 0 || !wpn || wpn === Infinity ? 0: wpn;

        wpmTag.innerText = wpn;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes
    }else{
        clearInterval(timer);
        inField.value = "";
    }
}

function initTimer(){
    if(timeleft > 0){
        timeleft--;
        timeTag.innerText = timeleft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeleft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeleft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inField.value = "";
    timeTag.innerText = timeleft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame)
