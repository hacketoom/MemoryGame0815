/*
 * Create a list that holds all of your cards
 */

//Reload page - restart game:
let reloadButton = document.querySelector('.restart');
reloadButton.addEventListener('click', function() {
  window.location.reload();
});
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//Measure playing time
let startGameTime; //set start time on load
let finishedGameTime = 0; //will hold time when game finished
let numberOfMatches = 0; //counts number of matches
let gameFinished = false; //before game is finished === false

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let classes = ["fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bomb", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bomb", "fa-bicycle"];
shuffle(classes);
// find all cards
let cards = document.querySelectorAll('.card');
let k = 0;
//add shuffled 'pictures' to all cards on deck
for (let card of cards) {
  card.firstElementChild.classList.add(classes[k]);
  k++;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//get a reference to deck
let deck = document.querySelector('.deck');
//array to hold cards and counter variable
let uncoveredCards = [];
let numberOfCards = 0;

// needed for counting moves:
let numberOfMoves = 0;
let moves = document.querySelector('.moves');
//initially set moves on site load
moves.textContent = numberOfMoves;

//Variables & new nodes needed for adding fields to Modal on winning the game
let modalBody = document.querySelector('.modal-body');
let wholetime
let node1 = document.createElement('P');
let node2 = document.createElement('P');
let textnode1;
let textnode2;

//show Card
function showCard(target) {
  event.target.classList.add('open'); //uncover Card
  event.target.classList.add('show'); //by changing classList
  uncoveredCards[numberOfCards] = event.target; //store card in array
  numberOfCards++;
}

//used for closing cards
function closeCards(cards) {
  for (let card of cards) {
    card.classList.remove('open');
    card.classList.remove('show');
  }
  cards.length = 0;
  numberOfCards = 0;
}

//store stars in array
let starPanel = document.querySelector('.stars');
let stars = starPanel.children;

//function for reducing the stars after a certain number of moves
let starNumber = 2; //start with position '2' on the stars array

function reduceStars(stars) {
  stars[starNumber].firstElementChild.classList.add('fa-star-o');
  stars[starNumber].firstElementChild.classList.remove('fa-star');
  starNumber--;
}


//main function for card-flip
//as well as check for a match
function uncoverCard(event) {
  if(numberOfMoves === 0) {
    startGameTime = performance.now();
  }

  if ((event.target.nodeName === 'LI')) {
    numberOfMoves++; //add one move after 2 cards have been clicked
    if ((numberOfMoves % 2) === 0) {
      moves.textContent = numberOfMoves / 2; //update displayed moves
    }

    //show only two cards at once
    if (uncoveredCards.length < 2) {
      showCard(event.target);
    }
  }
  //after 2 cards have been clicked:
  if (uncoveredCards.length === 2) {
    //check if the pictures on the cards match:
    //AND if they are NOT the same card
    if ((uncoveredCards[0].innerHTML == uncoveredCards[1].innerHTML) && (uncoveredCards[0] != uncoveredCards[1])) {
      //if they match: permanently uncover cards
      for (let card of uncoveredCards) {
        card.classList.remove('open');
        card.classList.remove('show');
        card.classList.add('match');
      }

      //increment number of matches
      numberOfMatches++;

      //define game finished after 8 matches
      if (numberOfMatches === 8) {
        gameFinished = true;
      }

      //show Modal when game is finished
      if (gameFinished) {
        finishedGameTime = performance.now();
        wholetime = (finishedGameTime - startGameTime) / 1000;
        textnode1 = document.createTextNode("You played " + wholetime.toFixed(2) + " seconds");
        textnode2 = document.createTextNode("Stars: " + (starNumber + 1));
        node1.appendChild(textnode1);
        node2.appendChild(textnode2);
        modalBody.appendChild(node1);
        modalBody.appendChild(node2);
        $('#winModal').modal('show');
      }

      //function needed here in order to reset the uncoveredCards array
      closeCards(uncoveredCards);

    } else { //case: cards do not match
      //wait 1/2 second until closing cards - otherwise not visible
      setTimeout(function() {
        closeCards(uncoveredCards);
      }, 500);
    }
  }
  //reducing number of stars after certain number of moves
  if (numberOfMoves === 20) {
    reduceStars(stars);
  }
  if (numberOfMoves === 60) {
    reduceStars(stars);
  }
  if (numberOfMoves === 100) {
    reduceStars(stars);
  }
}

//adding an EventListener for whole card functionality
deck.addEventListener('click', uncoverCard);
