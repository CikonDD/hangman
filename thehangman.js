$("#scoreMessage").hide();
$(".key").hide();

//////
let scorePlayer = 0;
let hangman = 0;

let dorsita = 0;

let doors = {
  q: "Open the right Door",
  as: [1, 2, 3, 4, 5],
  s: Math.ceil(Math.random() * 5),
};
//////
let quizs = [
  {
    q: "What is the capital of Russia?",
    s: "Moscow",
    as: ["Moscow", "Mosccow", "Mocsow"],
  },
  { q: "Nice?", s: "nice", as: ["nice", "yes", "no"] },
  {
    q: "What do you call a bear with no teeth?",
    s: "A gummy bear",
    as: ["A gummy bear", "A toothless bear", "A bear cub"],
  },
  {
    q: "Why couldn't the bicycle stand up by itself?",
    s: "It was two-tired",
    as: ["It was two-tired", "It was too heavy", "It was broken"],
  },
  {
    q: "What's orange and sounds like a parrot?",
    s: "A carrot",
    as: ["A carrot", "An orange parrot", "A squawking pumpkin"],
  },
  {
    q: "Why did the tomato turn red?",
    s: "Because it saw the salad dressing",
    as: [
      "Because it saw the salad dressing",
      "Because it was ripe",
      "Because it was embarrassed",
    ],
  },
  {
    q: "Why don't skeletons fight each other?",
    s: "They don't have the guts",
    as: [
      "They don't have the guts",
      "They are too weak",
      "They are too polite",
    ],
  },
  {
    q: "What's the best way to catch a squirrel?",
    s: "Climb a tree and act like a nut!",
    as: [
      "Climb a tree and act like a nut!",
      "Set up a trap with acorns",
      "Call for a squirrel whisperer",
    ],
  },
  {
    q: "What do you call fake spaghetti?",
    s: "An impasta",
    as: ["An impasta", "Fauxghetti", "Mockaroni"],
  },
  {
    q: "Why did the scarecrow win an award?",
    s: "Because he was outstanding in his field",
    as: [
      "Because he was outstanding in his field",
      "Because he was the only contestant",
      "Because he had the best clothes",
    ],
  },
  {
    q: "What do you get if you cross a snowman and a vampire?",
    s: "Frostbite",
    as: ["Frostbite", "Cold blood", "Frozen fangs"],
  },
  {
    q: "Why did the math book look sad?",
    s: "Because it had too many problems",
    as: [
      "Because it had too many problems",
      "Because it was old",
      "Because it lost its cover",
    ],
  },
];

//////
const checkGameOver = () => {
  if (scorePlayer <= -3) {
    $("#man").attr({ src: `./assets/hangman/5.svg` });
    $("#wlc-head").hide();
    $("#start").hide();
    $("#reset").hide();

    $("#playzone").empty();
    $("#playzone").append(`
      <div id="gameOver">
        <h1 class="gameover">GAME OVER!</h1>
        <p>Your final score: ${scorePlayer}</p>
        <button class="btn" onclick="window.location.reload();">Play Again</button>
      </div>
    `);

    resetScore();
  } else {
    if (scorePlayer >= 4) {
      $("#playzone").empty();
      $("#playzone").append(`
          <div id="gameOver">
            <h1 class="gameover">CONGRATULATIONS! YOU'VE COMPLETED THE GAME!</h4>
            <button class="btn" onclick="window.location.reload();">Play Again</button>
          </div>
        `);

      resetScore();
    }
  }
};
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
let choice = shuffle(quizs);
/////
const evenRandom = () => {
  let numberEven = Math.ceil(Math.random() * 5) * 2;
  return numberEven;
};
let numberRandomEven = Math.round(evenRandom() * 10);
function solveMathPuzzle(base) {
  let A1 = base * 1.5;
  let A2 = base * 12.5;
  let A3 = base * 13.5;
  let A4 = base * 3.5;

  let R1 = base * 14;
  let R2 = base * 10;
  let R3 = base * 15;
  let R4 = base * 16;

  let result = {
    A1: A1,
    A2: A2,
    A3: A3,
    A4: A4,
    R1: R1,
    R2: R2,
    R3: R3,
    R4: R4,
  };

  return result;
}
let riddleObj = solveMathPuzzle(numberRandomEven);

const showScoreSaved = () => {
  $("#scoreMessage").fadeIn();
  setTimeout(() => {
    $("#scoreMessage").fadeOut();
  }, 500);
};
const keya = () => {
  $(".key").fadeIn();
  setTimeout(() => {
    $(".key").fadeOut();
  }, 2000);
};

const saveScore = () => {
  showScoreSaved();
  localStorage.setItem("hangmanScore", scorePlayer);
  checkGameOver();
};

/////
const closedDoors = () => {
  $("#quizresult").hide();
  dorsita = doors;
  dorsita.as = shuffle(dorsita.as);
  displayDoor(dorsita);
  console.log(dorsita);
};
/////
const displayRiddle = (obj) => {
  $("#playzone").empty();
  $("#playzone").append(
    `<div class="mathpuzzle">
          <h4 class="qstitle">3,5 - MATH RIDDLE</h4>
          <h4 class="qtitle">FIND THE HINT !</h4>
          <table>
            <tr>
              <td><input type="number" class="input" id="input1" /></td>
              <td>+</td>
              <td><input type="number" class="input" id="input2" /></td>
              <td>=</td>
              <td class="number" id="nbr1">${obj.R1}</td>
            </tr>
            <tr>
              <td>+</td>
              <td></td>
              <td>+</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><input type="number" class="input" id="input3" /></td>
              <td>-</td>
              <td><input type="number" class="input" id="input4" /></td>
              <td>=</td>
              <td class="number" id="nbr2">${obj.R2}</td>
            </tr>
            <tr>
              <td>=</td>
              <td></td>
              <td>=</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td class="number" id="nbr3">${obj.R3}</td>
              <td></td>
              <td class="number" id="nbr4">${obj.R4}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <button id="clear" class="btn" onclick="clearInputs()">Validate your choice</button>
          <button id="submitp" class="btn" onclick='checker(riddleObj)'>REMOVE</button>
        </div>`
  );
};
/////

const keys = () => {
  keya();
  scorePlayer++;
  $("#score").text(scorePlayer);

  $("#nextstage2").hide();
  $(".adoor").hide();
  $(".qtitle").hide();
  $(".title").hide();
  $(".qstitle").hide();

  console.log(riddleObj);
  displayRiddle(riddleObj);
  saveScore();
};
/////

const checkQuiz = (answer) => {
  $("#quizz").hide();

  if (answer === choice[0].s) {
    scorePlayer++;
    $("#score").text(scorePlayer);

    $("#playzone").append(`
        <div id='quizresult'>
          <h4 class="qtitle">NICE ONE!</h4>
          <button id="nextstage" class="btn" onclick="closedDoors()">NEXT</button>
        </div>
      `);
    saveScore();
  } else {
    scorePlayer--;
    $("#score").text(scorePlayer);

    $("#playzone").append(`
        <div id='quizresult'>
          <h4 class="qtitle">WATCH OUT!!!</h4>
          <button id="nextstage" class="btn" onclick="closedDoors()">NEXT</button>
        </div>
      `);

    let x2 = $("#man").attr("src");
    x2 = x2[x2.length - 5];
    x2++;
    $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
    saveScore();
  }
};
$("#start").click(() => {
  playAudio();
  $("#start").attr("disabled", "disabled");
  $("#reset").hide();
  $("#man").attr({ src: "./assets/hangman/load.gif" });

  setTimeout(() => {
    $("#man").attr({ src: "./assets/hangman/0.svg" });
    $("#wlc-head").hide();
    $("#start").hide();
    choice[0].as = shuffle(choice[0].as);
    displayQuiz(choice[0]);
  }, 1000);
});
////
const displayQuiz = (quiz) => {
  $("#playzone").append(
    `<div id='quizz'>
      <h4 class="qstitle">1 - QUIZ STAGE</h4>
      <h4 class="qtitle">${quiz.q}</h4>
      <div class="quizans">
        <button id="s1" class="btn" onclick="checkQuiz('${quiz.as[0]}')">${quiz.as[0]}</button>
        <button id="s2" class="btn" onclick="checkQuiz('${quiz.as[1]}')">${quiz.as[1]}</button>
        <button id="s3" class="btn" onclick="checkQuiz('${quiz.as[2]}')">${quiz.as[2]}</button>
      </div>
    </div>`
  );
};

const checkDoor = (answer) => {
  console.log(answer);

  if (parseInt(answer) === dorsita.s) {
    scorePlayer++;
    $("#score").text(scorePlayer);

    $(".adoor").hide();
    $(".qtitle").hide();
    $("#playzone").append('<h4 class="qtitle">Enter the door.</h4>');
    $(".quizans").append(
      `<img class="adoor" src="./assets/doors/open.png" id="enter">`
    );
    setTimeout(() => {
      $(".adoor").hide();
      $(".qtitle").hide();
      $("#playzone").prepend(
        `<h4 class="qtitle">Sorry, you have lost the <span id='key' onclick="keys()">key</span>, find it.</span></h4>`
      );
      $(".quizans").append(
        `<img class="adoor1" src="./assets/doors/blocked.png" ></div>
        `
      );
      $("#playzone").append(
        `<button class="btn" onclick="nextRiddle()">GIVE-UP</button>
        `
      );
    }, 3000);
    saveScore();
  } else {
    scorePlayer--;
    $("#score").text(scorePlayer);

    x2 = $("#man").attr("src");
    x2 = x2[x2.length - 5];
    x2++;
    $("#man").attr({ src: `./assets/hangman/${x2}.svg` });

    $(".adoor").hide();
    $(".qtitle").hide();
    $("#playzone").prepend(
      `<h4 class="qtitle">Sorry, you don't have the <span id='key' onclick="keys()">key</span></h4>`
    );
    $(".quizans").append(
      `<img class="adoor1" src="./assets/doors/blocked.png" onclick="next2()"></div>`
    );
    $("#playzone").append(
      `<button class="btn" onclick="nextRiddle()">GIVE-UP</button>
      `
    );
    saveScore();
  }
};
/////
const displayDoor = (door) => {
  $("#playzone").append(
    `<div id='doorstage'>
      <h4 class="qstitle">2 - Step of the doors.</h4>
      <h4 class="qtitle">${door.q}</h4>
      <div id='doorsi' class="quizans">
        <img class="adoor" src="./assets/doors/close.png" id="s1" onclick="checkDoor('${door.as[0]}')" alt="">
        <img class="adoor" src="./assets/doors/close.png" id="s2" onclick="checkDoor('${door.as[1]}')" alt="">
        <img class="adoor" src="./assets/doors/close.png" id="s3" onclick="checkDoor('${door.as[2]}')" alt="">
        <img class="adoor" src="./assets/doors/close.png" id="s4" onclick="checkDoor('${door.as[3]}')" alt="">
        <img class="adoor" src="./assets/doors/close.png" id="s5" onclick="checkDoor('${door.as[4]}')" alt="">
      </div>
    </div>`
  );
};

/////

const checker = function (obj) {
  $("#submitp").attr("disabled", "disabled");
  $("#clear").attr("disabled", "disabled");
  console.log(obj);

  const input1 = parseInt($("#input1").val());
  const input2 = parseInt($("#input2").val());
  const input3 = parseInt($("#input3").val());
  const input4 = parseInt($("#input4").val());

  if (
    input1 === obj.A1 &&
    input3 === obj.A3 &&
    input2 === obj.A2 &&
    input4 === obj.A4
  ) {
    scorePlayer++;
    $("#score").text(scorePlayer);

    $("#playzone").empty();
    $("#playzone").append(`
        <div id="gameOver">
          <h1 class="gameover">CONGRATULATIONS! YOU'VE COMPLETED THE GAME! BUT YOU DON'T WIN</h1>
          <button class="btn" onclick="window.location.reload();">Play Again</button>
        </div>
   `);
    saveScore();
  } else {
    scorePlayer--;
    $("#score").text(scorePlayer);

    let x2 = $("#man").attr("src");
    x2 = x2[x2.length - 5];
    x2++;
    $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
    $("#input1").val(obj.A1);
    $("#input2").val(obj.A2);
    $("#input3").val(obj.A3);
    $("#input4").val(obj.A4);
    setTimeout(() => {
      $("#playzone").empty();
      $("#playzone").append(`
          <div id="gameOver">
            <h1 class="gameover">CONGRATULATIONS! YOU'VE COMPLETED THE GAME! BUT YOU DON'T WIN</h1>
            <button class="btn" onclick="window.location.reload();">Play Again</button>
          </div>
     `);
      saveScore();
    }, 5000);
  }
};

const nextRiddle = () => {
  scorePlayer--;
  $("#score").text(scorePlayer);

  x2 = $("#man").attr("src");
  x2 = x2[x2.length - 5];
  x2++;
  $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
  $("#playzone").empty();
  displayRiddle(riddleObj);
  saveScore();
};

const clearInputs = () => {
  $("#input1").val("");
  $("#input2").val("");
  $("#input3").val("");
  $("#input4").val("");
};

const loadScore = () => {
  const savedScore = localStorage.getItem("hangmanScore");
  if (savedScore !== null) {
    scorePlayer = parseInt(savedScore);
    $("#score").text(scorePlayer);
  }
};

const resetScore = () => {
  localStorage.setItem("hangmanScore", 0);
  loadScore();
  $("#reset").hide();
};
function playAudio() {
  audio.play();
  console.log("audio");
}

// Initialisation
$(document).ready(() => {
  var audio = document.getElementById("audio");
  loadScore();
});
