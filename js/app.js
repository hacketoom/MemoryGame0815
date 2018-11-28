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

//SHUFFLE card deck:
let classes = ["fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bomb", "fa-bicycle"];
let next = ["fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bomb", "fa-bicycle"];
shuffle(classes);
shuffle(next);
//shuffled array with 16 cards
let shuffled = classes.concat(next);
// find all cards
let cards = document.querySelectorAll('.card');
let k = 0;
//add shuffled 'pictures' to all cards on deck
for (let card of cards) {
  card.firstElementChild.classList.add(shuffled[k]);
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

//used for closing cards
function closeCards(cards) {
  for (let card of cards) {
    card.classList.remove('open');
    card.classList.remove('show');
  }
  cards.length = 0;
  numberOfCards = 0;
}
//show Card
function showCard(target) {
  event.target.classList.add('open'); //uncover Card
  event.target.classList.add('show'); //by changing classList
  uncoveredCards[numberOfCards] = event.target; //store card in array
  numberOfCards++;
}
// how many moves?
let move = 0;
let moves = document.querySelector('.moves');
moves.textContent = move;
//main function for card-flip
//as well as check for match
function uncoverCard(event) {
  move++; //add one move after 2 cards have been clicked
  if ((move % 2) === 0) {
    moves.textContent = move / 2; //update displayed moves
  }

  if ((event.target.nodeName === 'LI')) {
    if (uncoveredCards.length < 2) { //Only when an actual card is clicked
      showCard(event.target);
    }
    //after 2 cards have been clicked:
    if (uncoveredCards.length === 2) {
      //check if the pictures on the cards match:
      //AND if they are NOT the same card
      if ((uncoveredCards[0].innerHTML == uncoveredCards[1].innerHTML) && (uncoveredCards[0] != uncoveredCards[1])) {
        //if they match: make it show in the game by changing classes:
        for (let card of uncoveredCards) {
          card.classList.remove('open');
          card.classList.remove('show');
          card.classList.add('match');
        }
      }
      //wait 1/2 second until closing cards - otherwise not visible
      setTimeout(function() {
        closeCards(uncoveredCards);
      }, 500);
    }
  }
}
//adding an EventListener for whole card functionality
deck.addEventListener('click', uncoverCard);
