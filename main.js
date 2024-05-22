let scorePlayer = 0;
$("#score").append(scorePlayer);
hangman = 0;

let quiz1 = { q: "kjdhfkjhskfjh", s: "1", as: [1, 2, 3] };

/// quiz  objects

const checker = function (obj, answer) {
  // answer = value du player
  // obj = objet du quiz
  if (answer === obj.s) {
    /// apliquer une update du next stage
    scorePlayer++;
    hangman.push("");
  }
  //else
  scorePlayer--;
  hangman.pop(hangman[hangman.lenght - 1 + 1]);
  /// retour au  debut
};

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
        <h4 class="qtitle">${quiz.q}</h4>
        <div class="quizans">
          <button id="s1" class="btn">
            ${quiz.as[0]}
          </button>
          <button id="s2" class="btn" onclick="test(${quiz.as[1]})">
            ${quiz.as[1]}
          </button>
          <button id="s3" class="btn">
            ${quiz.as[2]}
          </button>
        </div>
      </div>`
  );
$("#quizz").fadeIn(3000);

function test(param) {
  console.log(param);
}
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
    /// truc afficher
    // displayQuiz(choice);
  }, 1000);
});

///quizclicks
console.log($("#s1"));

$("#s1").click(() => {
  console.log("hi");
});
// scorePlayer = 1;
// scorePlayer = 2;
// $("#score").append(scorePlayer);
// if ($("#s1").text().trim() === choice.s) {
//   scorePlayer++;
//   $("#playzone").hide();
// }
// scorePlayer--;
// $("#playzone").hide();

// "#man".attr({ src: `./assets/hangman/${hangman + 1}.svg` });

git init
git remote add origin https://github.com/CikonDD/hangman.git
git branch -M main
git push -u origin main