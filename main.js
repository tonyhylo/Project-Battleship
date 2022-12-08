function userPickedTails() {
    userChoice = 1;
    document.getElementById("tails").style.border = "2px solid black";
    pcChoice = randomCoinToss();
    if (userChoice == pcChoice) {
        whosTurn = "user";
    } else {
        whosTurn = "pc";
    }
    document.getElementById("result1").innerHTML = `${whosTurn.charAt(0).toUpperCase()+whosTurn.slice(1)} won! Place your battleships!`;
    document.getElementById("heads").removeEventListener("click", userPickedHeads);
    document.getElementById("tails").removeEventListener("click", userPickedTails);
}

function userPickedHeads() {
    userChoice = 0;
    document.getElementById("heads").style.border = "2px solid black";
    pcChoice = randomCoinToss();
    if (userChoice == pcChoice) {
        whosTurn = "user";
    } else {
        whosTurn = "pc";
    }
    document.getElementById("result1").innerHTML = `${whosTurn.charAt(0).toUpperCase()+whosTurn.slice(1)} won! Place your battleships!`;
    document.getElementById("tails").removeEventListener("click", userPickedTails);
    document.getElementById("heads").removeEventListener("click", userPickedHeads);
}

function randomCoinToss() {
    let choice = Math.random();
    if (choice < 0.5) {
        return 0;
    } else {
        return 1;
    }
}

let userChoice, pcChoice, whosTurn;
document.getElementById("tails").addEventListener("click", userPickedTails);
document.getElementById("heads").addEventListener("click", userPickedHeads);
