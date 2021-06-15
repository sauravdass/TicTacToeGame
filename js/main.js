//selecting all required elements
const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".options .playerX");
const selectBtnO = selectBox.querySelector(".options .playerO");
const playBoard = document.querySelector(".play-board");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    //add onclick attribute in all available span
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
};

selectBtnX.onclick = () => {
  selectBox.classList.add("hide"); //hide select box
  playBoard.classList.add("show"); //show the playboard section
};

selectBtnO.onclick = () => {
  selectBox.classList.add("hide"); //hide select box
  playBoard.classList.add("show"); //show the playboard section
  players.setAttribute("class", "players active player"); //set class attribute in players with players active player values
};

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

//user click function
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O"; //if player choose (O) then change playerSign to O
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.add("active"); ///add active class in players
    element.setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active"); //add active class in players
    element.setAttribute("id", playerSign); //set id attribute in span/box with player choosen sign
  }

  selectWinner(); //calling selectWinner function
  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none"; //add pointerEvents none to playboard so user can't immediately click on any other box until bot select
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(bot, randomTimeDelay); //calling bot function after random time
}

// bot auto select function
function bot() {
  let array = []; //creating empty array...we'll store unclicked boxes index
  if (runBot) {
    //if runBot is true
    playerSign = "O"; //change the playerSign to O so if player has chosen X then bot will O
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i); //inserting unclicked boxes number/index inside array
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
    if (array.length > 0) {
      //if array length is greater than 0
      if (players.classList.contains("player")) {
        playerSign = "X"; //if player has chosen O then bot will X
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside bot selected element
        players.classList.remove("active"); //remove active class in players
        allBox[randomBox].setAttribute("id", playerSign); //set id attribute in span/box with player chosen sign
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside bot selected element
        players.classList.remove("active"); //remove active class in players
        allBox[randomBox].setAttribute("id", playerSign); //set id attribute in span/box with player chosen sign
      }
      selectWinner(); //calling selectWinner function
    }
    allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't click on that box
    playBoard.style.pointerEvents = "auto"; //add pointerEvents auto in playboard so user can again click on box
    playerSign = "X"; //if player has chosen X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for bot
  }
}

function getIdVal(classname) {
  return document.querySelector(".box" + classname).id; //return id value
}
function checkIdSign(val1, val2, val3, sign) {
  //checking all id value is equal to sign (X or O) or not if yes then return true
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
}
function selectWinner() {
  //if the one of following winning combination match then select the winner
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    //after winning the match by someone
    runBot = false;
    bot();

    setTimeout(() => {
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700);
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; //displaying winning text with passing playerSign (X or O)
  } else {
    //if all boxes/element have id value and still no one win then draw the match
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      //after drawn the match
      runBot = false;
      bot();

      setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700);
      wonText.textContent = "Match has been drawn!";
    }
  }
}

//reload the current page
replayBtn.onclick = () => {
  window.location.reload();
};
