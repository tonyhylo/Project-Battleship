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
};
class Battleship {
  constructor(length) {
    this.length = length;
    this.ship = Array(length).fill(1);
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
  if (firstChar == secondChar) {
    console.log("v");
    return "v";
  } else {
    console.log("h");
    return "h";
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
let shipE2Delete = new BattleshipDelete(3);
let gameStatus = 0; // 0 = new game (place ships), 1 = player turn, -1 = pc turn
iniShipLocation();
followAllShips();
renderColourAll();

//Get where user clicked on grid
let currentClick, currentShip, newPosition, newDirection;
let placingShips; // 0 = identify ship, 1 = new position, 2 = new direction, 3 = render
document.querySelectorAll(".board-grid").forEach(function (currentValue) {
  currentValue.addEventListener("click", function () {
    currentClick = currentValue.getAttribute("id");
    if (!gameStatus) {
      // New game, placing ships
      if (!placingShips) {
        // Identifies which ship to move first
        // Checks which ship
        shipA5.location.forEach(function (currVal) {
          if (currVal == currentClick) {
            currentShip = "shipA5";
            placingShips = 1;
            console.log(currentShip);
          }
        });
      } else if (placingShips == 1) {
        // Gets second click to determine new position
        newPosition = currentClick;
        placingShips = 2;
        console.log(`currentShip: ${currentShip}, newPosition ${newPosition}`);
      } else if (placingShips == 2) {
        // Gets third click to determine direction
        newDirection = currentClick;
        console.log(
          `currentShip: ${currentShip}, newPosition: ${newPosition}, newDirection: ${newDirection}`
        );
        placingShips = 3;
      } else { // Render new positions
        // let horizOrVerti = horizontalOrVertical(newPosition, newDirection);
        // if (currentShip == "shipA5") {
        //     if (horizOrVerti == "v") {
        //         let yCoord = newPosition.charAt(1);
        //         shipA5.location.forEach(function(curVal) {
        //             curVal = newPosition.charAt(0) + yCoord;
        //             yCoord = yCoord + 1;
        //             console.log ("finished");
        //         })
        //     }
        // }
      }
      console.log(`value of placingShips is ${placingShips}`);
      if (placingShips == 3) {
        console.log(`newPosition is ${newPosition} and newDirection is ${newDirection}`)
        let horizOrVerti = horizontalOrVertical(newPosition, newDirection);
        console.log (`currentShip is ${currentShip}, and direction is ${horizOrVerti}`)
        if (currentShip == "shipA5") {
            if (horizOrVerti == "v") {
                console.log("vertical for sure");
                let yCoordNewPosi = Number(newPosition.charAt(1));
                let yCoord = yCoordNewPosi;
                let yCoordNewDirec = Number(newDirection.charAt(1));
                shipA5.location.forEach(function(curVal, index) {
                    curVal = newPosition.charAt(0) + yCoord;
                    shipA5.location[index] = curVal;
                    console.log(99, curVal);
                    if (yCoordNewPosi < yCoordNewDirec) {
                        yCoord = yCoord + 1;
                    } else {
                        yCoord = yCoord - 1;
                    }
                })
            }
            renderColour(shipA5);
            renderColourDelete(shipA5Delete);
            followAllShips();
        }
        placingShips = 0;
      }
    }
    console.log(currentClick);
  });
});
