// Initialize the player's score and attempts
let scorePlayer = 0;

// Display the initial score
$("#score").append(scorePlayer);

// Initialize the hangman stage counter
let hangman = 0;

// Define the doors object with a prompt, possible answers, and a randomly selected correct answer
let doors = {
  q: "Open the right Door",
  as: [1, 2, 3, 4, 5],
  s: Math.ceil(Math.random() * 5),
};

// Define the quiz questions array with questions, correct answers, and answer choices
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

// Shuffle function to randomize array elements
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to display a quiz question
const displayQuiz = (quiz) => {
  $("#playzone").append(
    `<div id='quizz'>
      <h4 class="qstitle">QUIZ STAGE</h4>
      <h4 class="qtitle">${quiz.q}</h4>
      <div class="quizans">
        <button id="s1" class="btn" onclick="checkQuiz('${quiz.as[0]}')">${quiz.as[0]}</button>
        <button id="s2" class="btn" onclick="checkQuiz('${quiz.as[1]}')">${quiz.as[1]}</button>
        <button id="s3" class="btn" onclick="checkQuiz('${quiz.as[2]}')">${quiz.as[2]}</button>
      </div>
    </div>`
  );
};

// Randomize quiz questions order
let choice = shuffle(quizs);

// Start game button click event
$("#start").click(() => {
  // Disable the start button
  $("#start").attr("disabled", "disabled");
  $("#reset").hide();
  // Change the hangman image to a loading gif
  $("#man").attr({ src: "./assets/hangman/load.gif" });

  // After a short delay, update the hangman image and display the first quiz question
  setTimeout(() => {
    $("#man").attr({ src: "./assets/hangman/0.svg" });
    $("#wlc-head").hide();
    $("#start").hide();
    choice[0].as = shuffle(choice[0].as);
    displayQuiz(choice[0]);
  }, 1000);
});

// Function to check the quiz answer
const checkQuiz = (answer) => {
  // Hide the quiz element
  $("#quizz").hide();

  // Check if the answer is correct
  if (answer === choice[0].s) {
    // Increment the player's score
    scorePlayer++;
    $("#score").text(scorePlayer);
    saveScore();
    // Display a positive result and a button to proceed to the next stage
    $("#playzone").append(`
      <div id='quizresult'>
        <h4 class="qtitle">NICE ONE!</h4>
        <button id="nextstage" class="btn" onclick="closedDoors()">NEXT</button>
      </div>
    `);
  } else {
    // Decrement the player's score
    scorePlayer--;
    $("#score").text(scorePlayer);
    saveScore();
    // Display a negative result and a button to proceed to the next stage
    $("#playzone").append(`
      <div id='quizresult'>
        <h4 class="qtitle">WATCH OUT!!!</h4>
        <button id="nextstage" class="btn" onclick="closedDoors()">NEXT</button>
      </div>
    `);

    // Update the hangman image to show the next stage of the hangman
    let x2 = $("#man").attr("src");
    x2 = x2[x2.length - 5];
    x2++;
    $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
  }
};

// Function to display the door choice stage
const displayDoor = (door) => {
  $("#playzone").append(
    `<div id='doorstage'>
      <h4 class="qstitle">DOORS STAGE</h4>
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

// Initialize the door stage counter
let dorsita = 0;

// Function to transition from the quiz stage to the door choice stage
const closedDoors = () => {
  $("#quizresult").hide();
  dorsita = shuffle(doors);
  dorsita.as = shuffle(dorsita.as);
  displayDoor(dorsita);
  console.log(dorsita);
};

// Function to check the selected door
const checkDoor = (answer) => {
  console.log(answer);

  // Check if the selected door is the correct one
  if (parseInt(answer) === dorsita.s) {
    // Increment the player's score
    scorePlayer++;
    $("#score").text(scorePlayer);
    saveScore();
    // Hide the doors and display a success message
    $(".adoor").hide();
    $(".qtitle").hide();
    $("#playzone").append('<h4 class="qtitle">ENTER TO THE DOOR</h4>');
    $(".quizans").append(
      `<img class="adoor" src="./assets/doors/open.png" id="enter">`
    );
  } else {
    // Decrement the player's score
    scorePlayer--;
    $("#score").text(scorePlayer);
    saveScore();
    // Hide the doors and display a failure message
    $(".adoor").hide();
    $(".qtitle").hide();
    $("#playzone").prepend(
      `<h4 class="qtitle">SORRY YOU DON'T HAVE THE <span id='key' onclick="key()">KEY <span></h4>`
    );
    $(".quizans").append(
      `<img class="adoor" src="./assets/doors/blocked.png" onclick="next2"></div>`
    );
    $("#doorstage + ").append(
      `<button id="nextstage2" class="btn" onclick="hell()">GO TO THE HELL!</button>`
    );

    // Update the hangman image to show the next stage of the hangman
    let x2 = $("#man").attr("src");
    x2 = x2[x2.length - 5];
    x2++;
    $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Function to save the score to localStorage
const saveScore = () => {
  localStorage.setItem("hangmanScore", scorePlayer);
};

// Function to load the score from localStorage
const loadScore = () => {
  const savedScore = localStorage.getItem("hangmanScore");
  if (savedScore !== null) {
    scorePlayer = parseInt(savedScore);
    $("#score").text(scorePlayer);
  }
};

// Function to save the score to localStorage
const resetScore = () => {
  var rst = 0;
  localStorage.setItem("hangmanScore", parseInt(rst));
  loadScore();
  $("#reset").hide();
};

//key
const key = () => {
  $("#nextstage2").hide();
  $(".adoor").hide();
  $(".qtitle").hide();
  $(".title").hide();
  $(".qstitle").hide();
};

// Fonction pour détecter la frappe de la touche "k" "e" "y"
$(document).keydown(function (event) {
  // Récupérer la touche pressée
  var keyPressed = String.fromCharCode(
    event.keyCode || event.which
  ).toLowerCase();
  let counter = 0;
  // Vérifier si la touche pressée correspond à la prochaine lettre dans "key"
  if (keyPressed === "k" || keyPressed === "e" || keyPressed === "y") {
    // Si oui, ajouter la lettre à la variable keyBuffer
    keyBuffer += keyPressed;

    // Vérifier si la variable keyBuffer contient le mot complet "key"
    if (keyBuffer === "key") {
      // Si oui, appeler la fonction key() et réinitialiser keyBuffer

      $("#playzone").append('<h4 class="qtitle">YOU CAN DO IT</h4>');
      $("#playzone").show();
      keyBuffer = "";
    }
  } else {
    // Si la touche pressée ne correspond pas à la prochaine lettre dans "key", réinitialiser keyBuffer
    keyBuffer = "";
    counter++;

    if (counter < 5) {
      scorePlayer--;
      $("#score").text(scorePlayer);
      saveScore();
      // Update the hangman image to show the next stage of the hangman
      let x2 = $("#man").attr("src");
      x2 = x2[x2.length - 5];
      x2++;
      $("#man").attr({ src: `./assets/hangman/${x2}.svg` });
    }
    $("#playzone").append('<h4 class="qtitle">ONE MORE TIME</h4>');
  }
});

// Load the score when the page is loaded
$(document).ready(() => {
  loadScore();
});
