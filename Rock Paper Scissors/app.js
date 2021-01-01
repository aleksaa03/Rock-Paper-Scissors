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
    win(sessionStorage.getItem("name"), maxScore, computerMove, playerMove);
    score.player = pScore;
    score.computer = cScore;

    save(score);
    saveRemovedScores(score);
  }

  if (cScore == maxScore) {
    win("Computer", maxScore, computerMove, playerMove);
    score.player = pScore;
    score.computer = cScore;

    save(score);
    saveRemovedScores(score);
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
        <h2>${sessionStorage.getItem("name")}</h2>
        <i class="fas fa-hand-${input}"></i>
      </div>
      <div class="computer">
        <h2>Computer</h2>
        <i class="fas fa-hand-${cOption}"></i>
      </div>
    </div>
    <button onclick="restart()">Restart</button>
    <button onclick="getScores()">Scores</button>
  </div>`;
}

var enterName = document.getElementById("enter-name");
var player = document.getElementById("player");
var welcome = document.getElementById("welcome");

setInterval(function () {
  if (sessionStorage.getItem("name") != null) {
    player.innerHTML = sessionStorage.getItem("name");
    enterName.style.display = "none";
    welcome.innerHTML = "Welcome, " + sessionStorage.getItem("name");
  }
});

function getName() {
  var name = document.getElementById("name").value;
  sessionStorage.setItem("name", name);
  enterName.style.display = "none";
}

function key(e) {
  if (e.keyCode == 13) {
    getName();
  }
}

document.getElementById("name").addEventListener("keyup", key);

function save(score) {
  var scores = JSON.parse(sessionStorage.getItem("score")) || [];
  scores.push(score);
  sessionStorage.setItem("score", JSON.stringify(scores));
}

function saveRemovedScores(score) {
  var removeScores = JSON.parse(sessionStorage.getItem("removeScores")) || [];
  removeScores.push(score);
  sessionStorage.setItem("removeScores", JSON.stringify(removeScores));
}

var scoresTable = document.getElementById("scores");

function getScores() {
  scoresTable.style.display = "block";
  var scores = JSON.parse(sessionStorage.getItem("score"));
  var table = document.getElementsByTagName("table")[0];

  var playerScoreTable = document.getElementById("player-score");
  var computerScoreTable = document.getElementById("computer-score");
  playerScoreTable.innerHTML = sessionStorage.getItem("name");
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

  playerSumText.innerHTML = `${sessionStorage.getItem("name")}: ${playerSum}`;
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
