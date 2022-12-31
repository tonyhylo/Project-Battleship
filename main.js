// function userPickedTails() {
//     userChoice = 1;
//     document.getElementById("tails").style.border = "2px solid black";
//     pcChoice = randomCoinToss();
//     if (userChoice == pcChoice) {
//         whosTurn = "user";
//     } else {
//         whosTurn = "pc";
//     }
//     document.getElementById("result1").innerHTML = `${whosTurn.charAt(0).toUpperCase()+whosTurn.slice(1)} won! Place your battleships!`;
//     document.getElementById("heads").removeEventListener("click", userPickedHeads);
//     document.getElementById("tails").removeEventListener("click", userPickedTails);
// }

// function userPickedHeads() {
//     userChoice = 0;
//     document.getElementById("heads").style.border = "2px solid black";
//     pcChoice = randomCoinToss();
//     let coinTossResult = randomCoinToss();
//     if (userChoice == pcChoice) {
//         whosTurn = "user";
//     } else {
//         whosTurn = "pc";
//     }
//     document.getElementById("result1").innerHTML = `${whosTurn.charAt(0).toUpperCase()+whosTurn.slice(1)} won! Place your battleships!`;
//     document.getElementById("tails").removeEventListener("click", userPickedTails);
//     document.getElementById("heads").removeEventListener("click", userPickedHeads);
// }

// function randomCoinToss() {
//     let choice = Math.random();
//     if (choice < 0.5) {
//         return 0;
//     } else {
//         return 1;
//     }
// }

// let userChoice, pcChoice, whosTurn;
// document.getElementById("tails").addEventListener("click", userPickedTails);
// document.getElementById("heads").addEventListener("click", userPickedHeads);

// ************************************FOR HEADS AND TAILS*****************************************************************
const colourLegend = {
  null: "white",
  1: "gray",
  "-1": "red",
  2: "blue",
};
class Battleship {
  constructor(length) {
    this.length = length;
    this.ship = Array(length).fill(1);
    this.location = Array(length).fill("null");
  }
}

class Battleship_PC {
  constructor(length) {
    this.length = length;
    this.ship = Array(length).fill(3);
    this.location = Array(length).fill("null");
  }
}

class BattleshipDelete {
  constructor(length) {
    this.length = length;
    this.ship = Array(length).fill(null);
    this.location = Array(length).fill("null");
  }
}

function iniShipLocation() {
  shipA5.location = ["A0", "A1", "A2", "A3", "A4"];
  shipB4.location = ["B0", "B1", "B2", "B3"];
  shipC3.location = ["C0", "C1", "C2"];
  shipD3.location = ["D0", "D1", "D2"];
  shipE2.location = ["E0", "E1"];
}

function followAllShips() {
  shipA5.location.forEach(function (currentValue, idx) {
    shipA5Delete.location[idx] = currentValue;
  });
  shipB4.location.forEach(function (currentValue, idx) {
    shipB4Delete.location[idx] = currentValue;
  });
  shipC3.location.forEach(function (currentValue, idx) {
    shipC3Delete.location[idx] = currentValue;
  });
  shipD3.location.forEach(function (currentValue, idx) {
    shipD3Delete.location[idx] = currentValue;
  });
  shipE2.location.forEach(function (currentValue, idx) {
    shipE2Delete.location[idx] = currentValue;
  });
}

function renderColour(bShip) {
  bShip.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[bShip.ship[idx]];
  });
}
function renderColourDelete(bShip) {
  bShip.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[bShip.ship[idx]];
  });
}

function renderColourAll() {
  renderColour(shipA5);
  renderColour(shipB4);
  renderColour(shipC3);
  renderColour(shipD3);
  renderColour(shipE2);
}

function renderColourDeleteAll() {
  renderColourDelete(shipA5Delete);
  renderColourDelete(shipB4Delete);
  renderColourDelete(shipC3Delete);
  renderColourDelete(shipD3Delete);
  renderColourDelete(shipE2Delete);
}

function findShip() {
  shipA5.location.forEach(function (currentValue) {
    if (currentValue == currentClick) {
      let test = document.querySelector(currentClick);
      return "shipA5";
    }
  });
}

function horizontalOrVertical(first, second) {
  let firstChar = first.charAt(0);
  let secondChar = second.charAt(0);
  let firstNum = first.charAt(1);
  let secondNum = second.charAt(1);
  if (firstChar != secondChar && firstNum != secondNum) {
    return "d";
  } else if (firstChar == secondChar) {
    return "v";
  } else {
    return "h";
  }
}

function moveShip(horizOrVerti, movedShip, movedShipDelete) {
  if (horizOrVerti == "v") {
    let yCoordNewPosi = Number(newPosition.charAt(1));
    let yCoord = yCoordNewPosi;
    let yCoordNewDirec = Number(newDirection.charAt(1));
    movedShip.location.forEach(function (curVal, index) {
      curVal = newPosition.charAt(0) + yCoord;
      movedShip.location[index] = curVal;
      if (yCoordNewPosi < yCoordNewDirec) {
        yCoord = yCoord + 1;
      } else {
        yCoord = yCoord - 1;
      }
    });
  } else {
    let yCoordNewPosi = newPosition.charAt(0).charCodeAt(0);
    let yCoord = yCoordNewPosi;
    let yCoordNewDirec = newDirection.charAt(0).charCodeAt(0);
    movedShip.location.forEach(function (curVal, index) {
      curVal = String.fromCharCode(yCoord) + newPosition.charAt(1);
      movedShip.location[index] = curVal;
      if (yCoordNewPosi < yCoordNewDirec) {
        yCoord = yCoord + 1;
      } else {
        yCoord = yCoord - 1;
      }
    });
  }
  renderColourDelete(movedShipDelete);
  followAllShips();
  renderColour(movedShip);
}

function shipIntersection(horizOrVerti, bShip) {
  if (horizOrVerti == "v") {
    if (Number(newPosition.charAt(1)) < Number(newDirection.charAt(1))) {
      for (
        let t = Number(newPosition.charAt(1));
        t < Number(newPosition.charAt(1)) + bShip.location.length;
        t++
      ) {
        let tempXCoord = newPosition.charAt(0);
        let tempYCoord = t;
        let tempCoord = tempXCoord + tempYCoord.toString();
        let tempColor =
          document.getElementById(tempCoord).style.backgroundColor;
        if (tempColor == "gray") {
          placingShips = 0;
          document.getElementById("error-msg").innerHTML =
            "Cannot intersect battleships.  Please reselect new battleship to move.";
          document.getElementById("msg").innerHTML = "";
          return false;
        }
      }
      return true;
    } else {
      for (
        let t = Number(newPosition.charAt(1));
        t > Number(newPosition.charAt(1)) - bShip.location.length;
        t--
      ) {
        let tempXCoord = newPosition.charAt(0);
        let tempYCoord = t;
        let tempCoord = tempXCoord + tempYCoord.toString();
        let tempColor =
          document.getElementById(tempCoord).style.backgroundColor;
        if (tempColor == "gray") {
          placingShips = 0;
          document.getElementById("error-msg").innerHTML =
            "Cannot intersect battleships.  Please reselect new battleship to move.";
          document.getElementById("msg").innerHTML = "";
          return false;
        }
      }
      return true;
    }
  } else {
    if (
      newPosition.charAt(0).charCodeAt(0) < newDirection.charAt(0).charCodeAt(0)
    ) {
      for (
        let t = newPosition.charAt(0).charCodeAt(0);
        t < newPosition.charAt(0).charCodeAt(0) + bShip.location.length;
        t++
      ) {
        let tempXCoord = t;
        let tempYCoord = newPosition.charAt(1);
        let tempCoord = String.fromCharCode(tempXCoord) + tempYCoord;
        let tempColor =
          document.getElementById(tempCoord).style.backgroundColor;
        if (tempColor == "gray") {
          placingShips = 0;
          document.getElementById("error-msg").innerHTML =
            "Cannot intersect battleships.  Please reselect new battleship to move.";
          document.getElementById("msg").innerHTML = "";
          return false;
        }
      }
      return true;
    } else {
      for (
        let t = newPosition.charAt(0).charCodeAt(0);
        t > newPosition.charAt(0).charCodeAt(0) - bShip.location.length;
        t--
      ) {
        let tempXCoord = t;
        let tempYCoord = newPosition.charAt(1);
        let tempCoord = String.fromCharCode(tempXCoord) + tempYCoord;
        let tempColor =
          document.getElementById(tempCoord).style.backgroundColor;
        if (tempColor == "gray") {
          placingShips = 0;
          document.getElementById("error-msg").innerHTML =
            "Cannot intersect battleships.  Please reselect new battleship to move.";
          document.getElementById("msg").innerHTML = "";
          return false;
        }
      }
      return true;
    }
    return true;
  }
}

function shipHitOrMiss(bShip) {
  document.getElementById("error-msg").innerHTML = "";
  for (let o = 0; o < bShip.length; o++) {
    if (gameStatus == 1) {
      if (currentClick == bShip.location[o]) {
        bShip.ship[o] = -1;
        renderColour(bShip);
        document.getElementById(
          "result-msg"
        ).innerHTML = `Hit, ${currentClick}! Click grid for PC turn.`;
        return true;
      }
    } else {
      if (pcGuess == bShip.location[o]) {
        bShip.ship[o] = -2;
        document.getElementById(
          "result-msg"
        ).innerHTML = `Hit, ${pcGuess}! Your turn!`;
        document.getElementById(pcGuess).innerHTML = "X";
        document.getElementById(pcGuess).style.boxShadow =
          "0 0 0 5px purple inset";
        return true;
      }
    }
  }
  return false;
}

function offGrid(horizOrVerti, bShip) {
  if (horizOrVerti == "v") {
    if (Number(newPosition.charAt(1)) < Number(newDirection.charAt(1))) {
      if (Number(newPosition.charAt(1)) + bShip.length > 10) {
        placingShips = 0;
        document.getElementById("error-msg").innerHTML =
          "Cannot place battleships off grid.  Please reselect new battleship to move.";
        document.getElementById("msg").innerHTML = "";
        return false;
      }
    } else {
      if (Number(newPosition.charAt(1)) - bShip.length < -1) {
        placingShips = 0;
        document.getElementById("error-msg").innerHTML =
          "Cannot place battleships off grid.  Please reselect new battleship to move.";
        document.getElementById("msg").innerHTML = "";
        return false;
      }
    }
  } else {
    if (
      newPosition.charAt(0).charCodeAt(0) < newDirection.charAt(0).charCodeAt(0)
    ) {
      if (newPosition.charAt(0).charCodeAt(0) + bShip.length > 75) {
        placingShips = 0;
        document.getElementById("error-msg").innerHTML =
          "Cannot place battleships off grid.  Please reselect new battleship to move.";
        document.getElementById("msg").innerHTML = "";
        return false;
      }
    } else {
      if (newPosition.charAt(0).charCodeAt(0) - bShip.length < 64) {
        placingShips = 0;
        document.getElementById("error-msg").innerHTML =
          "Cannot place battleships off grid.  Please reselect new battleship to move.";
        document.getElementById("msg").innerHTML = "";
        document.getElementById(pcGuess).innerHTML = "X";
        return false;
      }
    }
  }
  return true;
}

function generatePcBattleship(bShip_Pc) {
  let newPosition_PC_x = String.fromCharCode(
    Math.floor(Math.random() * 10) + 65
  );
  let newPosition_PC_y = Math.floor(Math.random() * 10);
  let newPosition_PC = newPosition_PC_x + newPosition_PC_y;
  let newDirection_PC, newDirection_PC_x, newDirection_PC_y;
  horOrVer_PC = Math.floor(Math.random() * 10) % 2;
  let beforeAfter_PC = Math.floor(Math.random() * 10) % 2;
  if (beforeAfter_PC == 0) {
    beforeAfter_PC = -1;
  }
  if (horOrVer_PC) {
    horOrVer_PC = "h";
    newDirection_PC_y = newPosition_PC_y;
    newDirection_PC_x =
      newPosition_PC_x.charAt(0).charCodeAt(0) + beforeAfter_PC;
    newDirection_PC =
      String.fromCharCode(newDirection_PC_x) + newDirection_PC_y;
  } else {
    horOrVer_PC = "v";
    newDirection_PC_y = newPosition_PC_y + beforeAfter_PC;
    newDirection_PC_x = newPosition_PC_x;
    newDirection_PC = newDirection_PC_x + newDirection_PC_y;
  }
  bShip_Pc.location.forEach(function (pcLoc, pcIndex) {
    if (horOrVer_PC == "v") {
      if (beforeAfter_PC == 1) {
        bShip_Pc.location[pcIndex] = newPosition_PC;
        newPosition_PC_y = newPosition_PC_y + 1;
        newPosition_PC = newPosition_PC_x + newPosition_PC_y;
      } else {
        bShip_Pc.location[pcIndex] = newPosition_PC;
        newPosition_PC_y = newPosition_PC_y - 1;
        newPosition_PC = newPosition_PC_x + newPosition_PC_y;
      }
    } else {
      if (beforeAfter_PC == 1) {
        bShip_Pc.location[pcIndex] = newPosition_PC;
        newPosition_PC_x = String.fromCharCode(
          newPosition_PC_x.charAt(0).charCodeAt(0) + 1
        );
        newPosition_PC = newPosition_PC_x + newPosition_PC_y;
      } else {
        bShip_Pc.location[pcIndex] = newPosition_PC;
        newPosition_PC_x = String.fromCharCode(
          newPosition_PC_x.charAt(0).charCodeAt(0) - 1
        );
        newPosition_PC = newPosition_PC_x + newPosition_PC_y;
      }
    }
  });
}

function offGrid_Pc(hOrV, bShip_Pc) {
  if (hOrV == "v") {
    if (
      Number(bShip_Pc.location[0].slice(1)) >= 0 &&
      Number(bShip_Pc.location[0].slice(1)) <= 9 &&
      Number(bShip_Pc.location[bShip_Pc.location.length - 1].slice(1)) >= 0 &&
      Number(bShip_Pc.location[bShip_Pc.location.length - 1].slice(1)) <= 9
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    if (
      Number(bShip_Pc.location[0].charAt(0).charCodeAt(0)) >= 65 &&
      Number(bShip_Pc.location[0].charAt(0).charCodeAt(0)) <= 74 &&
      Number(
        bShip_Pc.location[bShip_Pc.location.length - 1].charAt(0).charCodeAt(0)
      ) >= 65 &&
      Number(
        bShip_Pc.location[bShip_Pc.location.length - 1].charAt(0).charCodeAt(0)
      ) <= 74
    ) {
      return false;
    } else {
      return true;
    }
  }
}

function intersectionE_PC() {
  let flag = false;
  shipE2_PC.location.forEach(function (currentValue) {
    shipA5_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
    shipB4_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
    shipC3_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
    shipD3_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
  });
  if (flag) {
    return true;
  }
  return false;
}

function intersectionD_PC() {
  let flag = false;
  shipD3_PC.location.forEach(function (currentValue) {
    shipA5_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
    shipB4_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
    shipC3_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
  });
  if (flag) {
    return true;
  }
  return false;
}

function intersectionC_PC() {
  let flag = false;
  shipC3_PC.location.forEach(function (currentValue) {
    shipA5_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
    shipB4_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
  });
  if (flag) {
    return true;
  }
  return false;
}

function intersectionB_PC(bShip_Pc) {
  let flag = false;
  bShip_Pc.location.forEach(function (currentValue) {
    shipA5_PC.location.forEach(function (currVal) {
      if (currentValue == currVal) {
        flag = true;
        return true;
      }
    });
  });
  if (flag) {
    return true;
  }
  return false;
}

function colourPcShips() {
  shipA5_PC.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[shipA5_PC.ship[idx]];
  });
  shipB4_PC.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[shipB4_PC.ship[idx]];
  });
  shipC3_PC.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[shipC3_PC.ship[idx]];
  });
  shipD3_PC.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[shipD3_PC.ship[idx]];
  });
  shipE2_PC.location.forEach(function (currentValue, idx) {
    document.getElementById(currentValue).style.backgroundColor =
      colourLegend[shipE2_PC.ship[idx]];
  });
}

function checkGameOver(gameStatus) {
  let gameOverFlag = false;
  if (gameStatus == -1) {
    let shipA5Result = shipA5.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipB4Result = shipB4.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipC3Result = shipC3.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipD3Result = shipD3.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipE2Result = shipE2.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let gameOver =
      shipA5Result + shipB4Result + shipC3Result + shipD3Result + shipE2Result;
    if (gameOver == -34) {
      document.getElementById("error-msg").innerHTML = "";
      document.getElementById("msg").innerHTML = `Game over! PC wins!`;
      console.log("game over");
      gameOverFlag = true;
    }
    console.log(`game over pc ${gameOver}`);
  } else {
    let shipA5Result_Pc = shipA5_PC.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipB4Result_Pc = shipB4_PC.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipC3Result_Pc = shipC3_PC.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipD3Result_Pc = shipD3_PC.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let shipE2Result_Pc = shipE2_PC.ship.reduce(function (accumulator, cV) {
      return accumulator + cV;
    });
    let gameOver_Pc =
      shipA5Result_Pc +
      shipB4Result_Pc +
      shipC3Result_Pc +
      shipD3Result_Pc +
      shipE2Result_Pc;
    if (gameOver_Pc == -17) {
      document.getElementById("error-msg").innerHTML = "";
      document.getElementById("msg").innerHTML = `Game over! You win!`;
      console.log("game over");
      gameOverFlag = true;
    }
    console.log(`game over user ${gameOver_Pc}`);
  }
  if (gameOverFlag) {
    document.querySelectorAll(".board-grid").forEach(function (currentValue) {
      currentValue.removeEventListener();
      console.log(currentValue.getAttribute("class"));
    })
    console.log("no more clicky");
  }
}

//Initialize first run
let shipA5 = new Battleship(5);
let shipB4 = new Battleship(4);
let shipC3 = new Battleship(3);
let shipD3 = new Battleship(3);
let shipE2 = new Battleship(2);
let shipA5Delete = new BattleshipDelete(5);
let shipB4Delete = new BattleshipDelete(4);
let shipC3Delete = new BattleshipDelete(3);
let shipD3Delete = new BattleshipDelete(3);
let shipE2Delete = new BattleshipDelete(2);
let shipA5_PC = new Battleship_PC(5);
let shipB4_PC = new Battleship_PC(4);
let shipC3_PC = new Battleship_PC(3);
let shipD3_PC = new Battleship_PC(3);
let shipE2_PC = new Battleship_PC(2);
let gameStatus = 0; // 0 = new game (place ships), 1 = player turn, -1 = pc turn, 2 = game over start new game
iniShipLocation();
followAllShips();
renderColourAll();
// create pc battleships
let horOrVer_PC;
generatePcBattleship(shipA5_PC);
while (offGrid_Pc(horOrVer_PC, shipA5_PC)) {
  generatePcBattleship(shipA5_PC);
}
generatePcBattleship(shipB4_PC);
while (offGrid_Pc(horOrVer_PC, shipB4_PC) || intersectionB_PC(shipB4_PC)) {
  generatePcBattleship(shipB4_PC);
}
generatePcBattleship(shipC3_PC);
while (offGrid_Pc(horOrVer_PC, shipC3_PC) || intersectionC_PC()) {
  generatePcBattleship(shipC3_PC);
}
generatePcBattleship(shipD3_PC);
while (offGrid_Pc(horOrVer_PC, shipD3_PC) || intersectionD_PC()) {
  generatePcBattleship(shipD3_PC);
}
generatePcBattleship(shipE2_PC);
while (offGrid_Pc(horOrVer_PC, shipE2_PC) || intersectionE_PC()) {
  generatePcBattleship(shipE2_PC);
}

// Initial game directions
document.getElementById(
  "msg"
).innerHTML = `1. Click new battleship to move. <br>
2. Click new initial position of battleship. <br>
3. Click direction relative to new initial position.  Cannot be diagonal. <br>
4. When finished placing battleships, click 'Continue' button below.`;
// Get where user clicked on grid
let currentClick,
  currentShip,
  newPosition,
  newDirection,
  pcGuess,
  userPastGuesses = [],
  pcPastGuesses = [];
let placingShips; // 0 = identify ship, 1 = new position, 2 = new direction, 3 = render
document.querySelectorAll(".board-grid").forEach(function (currentValue) {
  currentValue.addEventListener("click", function () {
    let wasGuessed = false;
    currentClick = currentValue.getAttribute("id");
    userPastGuesses.forEach(function (currentValue) {
      if (currentValue == currentClick && gameStatus != -1) {
        wasGuessed = true;
      }
    });
    if (wasGuessed) {
      console.log("Guess again");
      document.getElementById(
        "error-msg"
      ).innerHTML = `${currentClick} was previously guessed, guess again.`;
      return;
    }
    if (!gameStatus) {
      //       // New game, placing ships
      //       // Initial game directions
      //       document.getElementById(
      //         "msg"
      //       ).innerHTML = `1. Click new ship to move. <br>
      // 2. Click new initial position of ship. <br>
      // 3. Click direction relative to new initial position.  Cannot be diagonal.`;
      if (!placingShips) {
        document.getElementById(
          "msg"
        ).innerHTML = `1. Click new battleship to move. <br>
2. Click new initial position of battleship. <br>
3. Click direction relative to new initial position.  Cannot be diagonal. <br>
4. When finished placing battleships, click 'Continue' button below.`;
        // Identifies which ship to move first
        // Checks which ship
        shipA5.location.forEach(function (currVal) {
          if (currVal == currentClick) {
            currentShip = "shipA5";
            placingShips = 1;
          }
        });
        shipB4.location.forEach(function (currVal) {
          if (currVal == currentClick) {
            currentShip = "shipB4";
            placingShips = 1;
          }
        });
        shipC3.location.forEach(function (currVal) {
          if (currVal == currentClick) {
            currentShip = "shipC3";
            placingShips = 1;
          }
        });
        shipD3.location.forEach(function (currVal) {
          if (currVal == currentClick) {
            currentShip = "shipD3";
            placingShips = 1;
          }
        });
        shipE2.location.forEach(function (currVal) {
          if (currVal == currentClick) {
            currentShip = "shipE2";
            placingShips = 1;
          }
        });

        document.getElementById("error-msg").innerHTML = "";
        document.getElementById("msg").innerHTML = "Click new position.";
      } else if (placingShips == 1) {
        // Gets second click to determine new position
        newPosition = currentClick;
        placingShips = 2;
        document.getElementById("msg").innerHTML = "Click new direction.";
      } else if (placingShips == 2) {
        // Gets third click to determine direction
        newDirection = currentClick;
        if (newPosition == newDirection) {
          console.log("cannot double click new direction, select new ship");
          document.getElementById("error-msg").innerHTML =
            "New position undefined, please select new battleship to move again.";
          document.getElementById("msg").innerHTML = "";
        } else {
          placingShips = 3;
        }
      }
      // Continue placing new ship position
      if (placingShips == 3) {
        let horizOrVerti = horizontalOrVertical(newPosition, newDirection);
        if (horizOrVerti == "d") {
          console.log("diag, new ship");
          document.getElementById("error-msg").innerHTML =
            "Cannot place diagonal ships.  Select new battleship to move.";
          document.getElementById("msg").innerHTML = "";
          placingShips = 0;
          return;
        }
        if (currentShip == "shipA5") {
          if (offGrid(horizOrVerti, shipA5)) {
            if (shipIntersection(horizOrVerti, shipA5)) {
              moveShip(horizOrVerti, shipA5, shipA5Delete);
            }
          }
        } else if (currentShip == "shipB4") {
          if (offGrid(horizOrVerti, shipB4)) {
            if (shipIntersection(horizOrVerti, shipB4)) {
              moveShip(horizOrVerti, shipB4, shipB4Delete);
            }
          }
        } else if (currentShip == "shipC3") {
          if (offGrid(horizOrVerti, shipC3)) {
            if (shipIntersection(horizOrVerti, shipC3)) {
              moveShip(horizOrVerti, shipC3, shipC3Delete);
            }
          }
        } else if (currentShip == "shipD3") {
          if (offGrid(horizOrVerti, shipD3)) {
            if (shipIntersection(horizOrVerti, shipD3)) {
              moveShip(horizOrVerti, shipD3, shipD3Delete);
            }
          }
        } else if (currentShip == "shipE2") {
          if (offGrid(horizOrVerti, shipE2)) {
            if (shipIntersection(horizOrVerti, shipE2)) {
              moveShip(horizOrVerti, shipE2, shipE2Delete);
            }
          }
        }
        document.getElementById(
          "msg"
        ).innerHTML = `1. Click new battleship to move. <br>
2. Click new initial position of battleship. <br>
3. Click direction relative to new initial position.  Cannot be diagonal. <br>
4. When finished placing battleships, click 'Continue' button below.`;
        placingShips = 0;
      }
    } else if (gameStatus == 1) {
      userPastGuesses.push(currentClick);
      // Check if click got hit
      while (1) {
        if (shipHitOrMiss(shipA5_PC)) {
          break;
        }

        if (shipHitOrMiss(shipB4_PC)) {
          break;
        }

        if (shipHitOrMiss(shipC3_PC)) {
          break;
        }

        if (shipHitOrMiss(shipD3_PC)) {
          break;
        }

        if (shipHitOrMiss(shipE2_PC)) {
          break;
        }
        document.getElementById(currentClick).style.backgroundColor = "yellow";
        document.getElementById(
          "result-msg"
        ).innerHTML = `Miss, ${currentClick}! Click grid for PC turn.`;
        break;
      }

      // Check if game over
      checkGameOver(gameStatus);
      gameStatus = -1;
    } else if (gameStatus == -1) {
      document.getElementById("error-msg").innerHTML = "";
      document.getElementById("msg").innerHTML = `PC turn `;
      let wasGuessed = false;
      // let pcGuess_x = String.fromCharCode(Math.floor(Math.random() * 10) + 65);
      // let pcGuess_y = Math.floor(Math.random() * 10).toString();
      // pcGuess = pcGuess_x + pcGuess_y;
      if (pcPastGuesses.length) {
        while (!wasGuessed) {
          let pcGuess_x = String.fromCharCode(
            Math.floor(Math.random() * 10) + 65
          );
          let pcGuess_y = Math.floor(Math.random() * 10).toString();
          pcGuess = pcGuess_x + pcGuess_y;
          pcPastGuesses.forEach(function (currentValue) {
            if (currentValue == pcGuess) {
              wasGuessed = true;
            }
          });
          if (wasGuessed) {
            wasGuessed = false;
          } else if (!wasGuessed) {
            break;
          }
        }
      } else {
        let pcGuess_x = String.fromCharCode(
          Math.floor(Math.random() * 10) + 65
        );
        let pcGuess_y = Math.floor(Math.random() * 10).toString();
        pcGuess = pcGuess_x + pcGuess_y;
      }

      pcPastGuesses.push(pcGuess);
      while (1) {
        if (shipHitOrMiss(shipA5)) {
          break;
        }

        if (shipHitOrMiss(shipB4)) {
          break;
        }

        if (shipHitOrMiss(shipC3)) {
          break;
        }

        if (shipHitOrMiss(shipD3)) {
          break;
        }

        if (shipHitOrMiss(shipE2)) {
          break;
        }
        document.getElementById(
          "result-msg"
        ).innerHTML = `Miss, ${pcGuess}! Your turn.`;
        document.getElementById(pcGuess).innerHTML = "O";
        break;
      }
      checkGameOver(gameStatus);
      gameStatus = 1;
    }
  });
});
// Changes game status, if button required
document
  .getElementById("btn")
  .addEventListener("click", function (currentValue) {
    if (!placingShips) {
      gameStatus = 1;
      document.getElementById("msg").innerHTML = "Your turn, pick a cell!";
      this.remove();
    } else if (placingShips == 1) {
      document.getElementById("msg").innerHTML =
        "Finish placing battleships before continuing. Click new position.";
    } else if (placingShips == 2) {
      document.getElementById("msg").innerHTML =
        "Finish placing battleships before continuing. Click new direction.";
    }
  });
