var pHand = document.getElementById("p-hand");
var cHand = document.getElementById("c-hand");
var pScoreText = document.getElementById("p-score");
var cScoreText = document.getElementById("c-score");

var pScore = 0;
var cScore = 0;

var computerOptions = ["rock", "paper", "scissors"];

function play(move) {
  var playerOption = document.querySelectorAll(".player-option");
  var hands = document.querySelectorAll(".hand");

  hands[0].style.animation = "playerMove 1s forwards";
  hands[1].style.animation = "computerMove 1s forwards";

  pHand.className = "fas fa-hand-rock";
  cHand.className = "fas fa-hand-rock";

  playerOption.forEach((button) => {
    button.style.pointerEvents = "none";
  });

  setTimeout(function () {
    playerOption.forEach((button) => {
      button.style.pointerEvents = "all";
    });
    pHand.className = "fas fa-hand-" + move + " " + "hand";
    var cOption = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    cHand.className = "fas fa-hand-" + cOption + " " + "hand";

    compareMove(move, cOption);
  }, 1000);

  hands.forEach((hand) => {
    hand.addEventListener("animationend", function () {
      hand.style.animation = "";
    });
  });
}

function compareMove(playerMove, computerMove) {
  if (playerMove == computerMove) {
    return;
  }

  if (playerMove == "rock") {
    if (computerMove == "paper") {
      console.log("Computer Wins");
      cScore++;
    } else {
      console.log("Player Wins");
      pScore++;
    }
  }

  if (playerMove == "paper") {
    if (computerMove == "rock") {
      console.log("Player Wins");
      pScore++;
    } else {
      console.log("Computer Wins");
      cScore++;
    }
  }

  if (playerMove == "scissors") {
    if (computerMove == "rock") {
      console.log("Computer Wins");
      cScore++;
    } else {
      console.log("Player Wins");
      pScore++;
    }
  }

  var score = {
    player: 0,
    computer: 0,
  };

  if (pScore == maxScore) {
    win(localStorage.getItem("name"), maxScore, computerMove, playerMove);
    score.player = pScore;
    score.computer = cScore;

    save("score", score, "session");
    save("removeScores", score, "session");
    save("high-score", score, "local");
    sounds("win");
  }

  if (cScore == maxScore) {
    win("Computer", maxScore, computerMove, playerMove);
    score.player = pScore;
    score.computer = cScore;

    save("score", score, "session");
    save("removeScores", score, "session");
    save("high-score", score, "local");
    sounds("lose");
  }

  pScoreText.innerHTML = pScore;
  cScoreText.innerHTML = cScore;
}

var maxScore = 5;

function count(num) {
  var maxScoreText = document.getElementById("max-score");

  if (num == 2) {
    if (maxScore != 30) {
      maxScore++;
    } else {
      maxScore = 30;
    }
  }

  if (num == 1) {
    if (maxScore != 5) {
      maxScore--;
    } else {
      maxScore = 5;
    }
  }

  maxScoreText.innerHTML = maxScore;
}

var game = document.getElementById("game");
var mainScreen = document.getElementById("main-screen");

function start() {
  game.style.display = "flex";
  mainScreen.style.display = "none";
}

var winner = document.getElementById("winner");

function win(matchWinner, maxScore, cOption, input) {
  winner.style.display = "block";
  winner.innerHTML = `<div class="content">
    <h2>${matchWinner} Wins</h2>
    <h2>Max score: ${maxScore}</h2>
    <div class="move">
      <div class="player">
        <h2>${localStorage.getItem("name")}</h2>
        <i class="fas fa-hand-${input} player-hand-color"></i>
      </div>
      <div class="computer">
        <h2>Computer</h2>
        <i class="fas fa-hand-${cOption}"></i>
      </div>
    </div>
    <button onclick="restart()">Restart</button>
    <button onclick="getScores()">Scores</button>
  </div>`;
  executeColor = true;

  return executeColor;
}

var enterName = document.getElementById("enter-name");
var player = document.getElementById("player");

setInterval(function () {
  if (localStorage.getItem("name") != null) {
    player.innerHTML = localStorage.getItem("name");
    enterName.remove();
  }
  if (executeColor == true) {
    var color = localStorage.getItem("color");
    var winnerHand = document.querySelector(".player-hand-color");
    saveColorHand(winnerHand, color);
  }
});

function getName() {
  var name = document.getElementById("name").value;
  if (name != "") {
    localStorage.setItem("name", name);
    enterName.remove();
  }
}

function key(e) {
  if (e.keyCode == 13) {
    getName();
  }
}

if (localStorage.getItem("name") == null) {
  enterName.innerHTML = `<div class="name">
    <h1>Enter a name</h1>
    <input type="text" name="" id="name" maxlength="10" />
    <p>Press <kbd>Enter</kbd> to start</p>
    </div>`;
}

if (enterName.innerHTML != "") {
  document.getElementById("name").addEventListener("keyup", key);
}

function save(name, score, typeStorage) {
  var array;
  if (typeStorage == "local") {
    array = JSON.parse(localStorage.getItem(name)) || [];
    array.push(score);
    localStorage.setItem(name, JSON.stringify(array));
  } else {
    array = JSON.parse(sessionStorage.getItem(name)) || [];
    array.push(score);
    sessionStorage.setItem(name, JSON.stringify(array));
  }
}

var scoresTable = document.getElementById("scores");

function getScores() {
  scoresTable.style.display = "block";
  var scores = JSON.parse(sessionStorage.getItem("score"));
  var table = document.getElementsByTagName("table")[0];

  var playerScoreTable = document.getElementById("player-score");
  var computerScoreTable = document.getElementById("computer-score");
  playerScoreTable.innerHTML = localStorage.getItem("name");
  computerScoreTable.innerHTML = "Computer";

  var playerSumText = document.getElementById("player-sum");
  var computerSumText = document.getElementById("computer-sum");

  var playerSum = 0;
  var computerSum = 0;

  var tbody = document.querySelectorAll(".tbody");

  tbody.forEach((tbody) => {
    tbody.remove();
  });

  for (var i = 0; i < scores.length; i++) {
    table.innerHTML += `
    <tbody class="tbody">
      <tr>
        <td>${scores[i].player}</td>
        <td>${scores[i].computer}</td>
      </tr>
    </tbody>`;
  }

  var removedScores = JSON.parse(sessionStorage.getItem("removeScores"));

  for (var i = 0; i < removedScores.length; i++) {
    playerSum += parseInt(removedScores[i].player);
    computerSum += parseInt(removedScores[i].computer);
  }

  playerSumText.innerHTML = `${localStorage.getItem("name")}: ${playerSum}`;
  computerSumText.innerHTML = `Computer: ${computerSum}`;
}

function restart() {
  var scores = JSON.parse(sessionStorage.getItem("score"));

  if (scores.length % 7 == 0) {
    sessionStorage.removeItem("score");
  }

  location.reload();
}

function exit() {
  scoresTable.style.display = "none";
}

var soundStorage = sessionStorage.getItem("sound");
var executeSound;

if (soundStorage == null || soundStorage == "volume-up") {
  executeSound = false;
} else {
  executeSound = true;
}

var sound = document.querySelector(".sound");

function sounds(getSound) {
  if (!executeSound) {
    var audio = new Audio("media/" + getSound + ".mp3");
    audio.play();
  }
}

function controlSound() {
  if (sound.className == "fas fa-volume-up sound") {
    sound.style.color = "#e74c3c";
    sound.className = "fas fa-volume-mute sound";
    sessionStorage.setItem("sound", "volume-mute");
    executeSound = true;
  } else {
    sound.style.color = localStorage.getItem("color");
    sound.className = "fas fa-volume-up sound";
    sessionStorage.setItem("sound", "volume-up");
    executeSound = false;
  }

  return executeSound;
}

var savedSound = sessionStorage.getItem("sound");

if (savedSound == null || savedSound == "volume-up") {
  sound.style.color = localStorage.getItem("color");
  sound.className = "fas fa-volume-up sound";
  execute = false;
} else {
  sound.style.color = "#e74c3c";
  sound.className = "fas fa-volume-mute";
  execute = true;
}

var customizeContainer = document.getElementById("customize");
var colorBlocks = document.getElementById("color-blocks");
var changeNameInput = document.getElementById("change-name");
var colors = ["#000000", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f", "#e74c3c"];

function options() {
  mainScreen.style.display = "none";
  customizeContainer.style.display = "block";

  var removedBlock = document.querySelectorAll(".block");

  removedBlock.forEach((block) => {
    block.remove();
  });

  for (var i = 0; i < colors.length; i++) {
    colorBlocks.innerHTML += `<div class="block" onclick="setColor('${colors[i]}')"></div>`;
    var block = document.querySelectorAll(".block");
    block[i].style.background = colors[i];
  }

  changeNameInput.value = localStorage.getItem("name");
}

var colorHand = document.querySelector(".color-hand");
var playerHand = document.querySelectorAll(".player-hand");

function setColor(color) {
  colorHand.style.color = color;
  localStorage.setItem("color", color);
  root.style.setProperty("--globalColor", color);
  sound.style.color = color;
}

var root = document.documentElement;

function saveChanges() {
  for (var i = 0; i < playerHand.length; i++) {
    playerHand[i].style.color = localStorage.getItem("color");
  }
  customizeContainer.style.display = "none";
  mainScreen.style.display = "flex";
  root.style.setProperty("--globalColor", localStorage.getItem("color"));

  if (localStorage.getItem("name") != changeNameInput.value && changeNameInput.value != "") {
    localStorage.setItem("name", changeNameInput.value);
  }
}

var savedColor = localStorage.getItem("color");

saveColorHand(colorHand, savedColor);

playerHand.forEach((hand) => {
  if (savedColor == null) {
    hand.style.color = "#000000";
  } else {
    hand.style.color = savedColor;
  }
});

var executeColor = false;

function saveColorHand(hand, savedColor) {
  if (savedColor == null) {
    hand.style.color = "#000000";
  } else {
    hand.style.color = savedColor;
  }
  root.style.setProperty("--globalColor", savedColor);
}

function highScore() {
  var highScoreText = document.getElementById("high-score");
  var highScoreMedal = document.querySelectorAll(".medal");
  var highScore = 0;

  var highScoreSave = JSON.parse(localStorage.getItem("high-score"));

  if (highScoreSave != null) {
    for (var i = 0; i < highScoreSave.length; i++) {
      highScore += parseInt(highScoreSave[i].player);
    }
  }

  highScoreText.innerHTML = "High Score: " + highScore;

  highScoreMedal.forEach((medal) => {
    if (highScore < 50) {
      medal.style.color = "#cd7f32";
    } else if (highScore >= 50 && highScore < 200) {
      medal.style.color = "#c0c0c0";
    } else {
      medal.style.color = "#ffd700";
    }
  });
}

highScore();

function resetScore() {
  localStorage.removeItem("high-score");
  highScore();
}

var highScoreTableDiv = document.getElementById("high-score-table");

function highScoreTable(click) {
  if (click == "open") {
    highScoreTableDiv.style.display = "block";
  } else {
    highScoreTableDiv.style.display = "none";
  }
}
