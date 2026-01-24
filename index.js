const quizData = [
    {
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        a: "A Dream",
        b: "A Map",
        c: "An Ocean",
        d: "A Dictionary",
        correct: "b"
    },
    {
        question: "I follow you all day long, but when the night comes, I am gone. What am I?",
        a: "A Cloud",
        b: "A Shadow",
        c: "The Moon",
        d: "A Dream",
        correct: "b"
    },
    {
        question: "What has a thumb and four fingers but is not alive?",
        a: "A Hand",
        b: "A Skeleton",
        c: "A Glove",
        d: "A Mirror",
        correct: "c"
    },
    {
        question: "The more of this there is, the less you see. What is it?",
        a: "Light",
        b: "Fog",
        c: "Darkness",
        d: "Glass",
        correct: "c"
    },
    {
        question: "What can you break, even if you never pick it up or touch it?",
        a: "A Promise",
        b: "A Window",
        c: "A Record",
        d: "Silence",
        correct: "a"
    },
    {
        question: "I have keys, but no locks. I have space, but no room. You can enter, but never leave. What am I?",
        a: "A Jail",
        b: "A Keyboard",
        c: "A Map",
        d: "A Library",
        correct: "b"
    },
    {
        question: "What invention lets you look right through a wall?",
        a: "A Drill",
        b: "A Telescope",
        c: "A Window",
        d: "An X-ray",
        correct: "c"
    }
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const optionLis = document.querySelectorAll("li");

let currentQuiz = 0;
let score = 0;
let answered = false;

loadQuiz();

function loadQuiz() {
    resetState();
    const q = quizData[currentQuiz];

    questionEl.innerText = q.question;

    optionLis[0].innerHTML = `<input type="radio" name="answer" value="a"> <label>${q.a}</label>`;
    optionLis[1].innerHTML = `<input type="radio" name="answer" value="b"> <label>${q.b}</label>`;
    optionLis[2].innerHTML = `<input type="radio" name="answer" value="c"> <label>${q.c}</label>`;
    optionLis[3].innerHTML = `<input type="radio" name="answer" value="d"> <label>${q.d}</label>`;

    optionLis.forEach(li => {
        li.onclick = () => {
            if (!answered) li.querySelector("input").checked = true;
        };
    });
}

function resetState() {
    answered = false;
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
    optionLis.forEach(li => li.classList.remove("correct-hover", "wrong-hover"));
}

function getSelected() {
    return document.querySelector("input[name='answer']:checked")?.value;
}

submitBtn.onclick = () => {
    const answer = getSelected();
    if (!answer) return alert("Please select an answer!");

    answered = true;
    const correct = quizData[currentQuiz].correct;

    optionLis.forEach(li => {
        const input = li.querySelector("input");
        if (input.value === correct) li.classList.add("correct-hover");
        if (input.checked && input.value !== correct) li.classList.add("wrong-hover");
    });

    if (answer === correct) score++;
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};

nextBtn.onclick = () => {
    currentQuiz++;
    currentQuiz < quizData.length ? loadQuiz() : showResult();
};

function showResult() {
    quiz.innerHTML = `
        <div style="text-align:center">
            <h2>🎉 QuizWhiz Completed!</h2>
            <p>Your Score</p>
            <h1>${score} / ${quizData.length}</h1>
            <button onclick="location.reload()">Restart Quiz</button>
        </div>
    `;
}
