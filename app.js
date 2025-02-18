var imgurl = "https://raw.githubusercontent.com/benjaminbilgehan/imgbj/refs/heads/main/";

var dealerSum =0;
var yourSum = 0;

var dealerAceCount =0 ;
var yourAceCount = 0; 

var hidden;
var deck; 

var canHit =true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}



function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];
    for (let i =0; i < types.length; i++) {
        for (let j =0; j<values.length; j++) {
            deck.push(values[j] + "-" + types[i]); 
        }
    }
    console.log(deck);

}
 

function shuffleDeck() {
    for (let i =0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;

    }
    console.log(deck);
}


function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    console.log("Dealer sum1: " + dealerSum);
    dealerAceCount = checkAce(hidden);
    console.log("Hidden card: " + hidden);
    

    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = imgurl + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    

    for (let i =0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = imgurl + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    yourSum = reduceAce(yourSum, yourAceCount);

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
  

}


function hit() {
    if (!canHit) {
        return; 
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = imgurl + card + ".png";
    
    // Get the value and add it to sum
    let value = getValue(card);
    yourSum += value;
    
    document.getElementById("your-cards").append(cardImg);

    if (yourSum > 21) {
        canHit = false;
        document.getElementById("hit").disabled = true;
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
}



function getValue(card) {
    let data = card.split("-");
    let value = data[0];
  
    if (isNaN(value)) {
        if (value == "A") {
            // For Aces, check the current sum to decide if it should be 11 or 1
            if (yourSum + 11 <= 21) {
                return 11;
            }
            return 1;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    let data = card.split("-");
    let value = data[0];
    if (value == "A") {
        return 1;
    }
    return 0;
}


function reduceAce(playerSum, playerAceCount) {
    return playerSum; // No longer needed since we handle Aces in getValue
}


function stay() {
   dealerSum = reduceAce(dealerSum, dealerAceCount);
   yourSum = reduceAce(yourSum, yourAceCount);

   canHit = false;
   document.getElementById("hidden").src = imgurl + hidden + ".png";

   let message = "";

   if (yourSum > 21) {
    message = "You lose!";
    document.getElementById("restartAlert").style.display = "block";               document.getElementById("dealer-sum").innerText = dealerSum;
   document.getElementById("your-sum").innerText = yourSum;
   } else if (dealerSum > 21) {
    message = "You win!";
    document.getElementById("restartAlert").style.display = "block";
   } else if (yourSum > dealerSum) {
    message = "You win!";
    document.getElementById("restartAlert").style.display = "block"; 
   
   } else if (yourSum < dealerSum) {
    message = "You lose!";
    document.getElementById("restartAlert").style.display = "block";
   
   } else {
    message = "Push!";
    document.getElementById("restartAlert").style.display = "block";
   
   }

   document.getElementById("dealer-sum").innerText = dealerSum;
   document.getElementById("your-sum").innerText = yourSum;
   document.getElementById("results").innerText = message;
   document.getElementById("results").style.display = "block";

}


function restartGame() {
        window.location.href = window.location.href;

}


function gameCancel() {
    document.getElementById("restartAlert").style.display = "none";
}