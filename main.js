let scorePlayer = 0;
$("#score").append(scorePlayer);
hangman = 0;

let quiz1 = { q: "kjdhfkjhskfjh", s: "1", as: [1, 2, 3] };

///random quizs
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const displayQuiz = (quiz) =>
  $("#playzone").append(
    `<div id= 'quizz'>
    <h4 class="qstitle">QUIZ STAGE</h4>
        <h4 class="qtitle">${quiz.q}</h4>
        <div class="quizans">
          <button id="s1" class="btn" onclick="checkQuiz(${quiz.as[0]})">
            ${quiz.as[0]}
          </button>
          <button id="s2" class="btn" onclick="checkQuiz(${quiz.as[1]})">
            ${quiz.as[1]}
          </button>
          <button id="s3" class="btn" onclick="checkQuiz(${quiz.as[2]})">
            ${quiz.as[2]}
          </button>
        </div>
      </div>`
  );
$("#quizz").fadeIn(3000);

// welcome frame disable
$("#start").click(() => {
  $("#start").attr("disabled", "disabled");
  $("#man").attr({ src: "./assets/hangman/load.gif" });
  setTimeout(() => {
    $("#man").attr({ src: "./assets/hangman/0.svg" });
    //
    $("#wlc-head").hide();
    $("#start").hide();
    let choice = shuffle(quiz1);
    choice.as = shuffle(choice.as);
    displayQuiz(choice);
  }, 1000);
});

///CHECK QUESTION
const checkQuiz = function (answer) {
  $("#quizz").hide();
  console.log(answer);
  if (answer === parseInt(quiz1.s)) {
    scorePlayer++;
    $("#score").text(scorePlayer);
    $("#playzone").append(`<h4 class="qtitle">NICE ONE !</h4>
    <button id="s1" class="btn" onclick="">next stage</button>`);
  } else {
    scorePlayer--;
    $("#score").text(scorePlayer);
    $("#playzone").append(`<h4 class="qtitle">WATCH OUT !!!</h4>
    <button id="s1" class="btn" onclick="">next stage</button>`);
    let x2 = $("#man").attr("src");
    x2 = x2[x2.length - 5];
    x2++;
    $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
  }
};
