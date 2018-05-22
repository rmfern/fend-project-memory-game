/*
 * Create a list that holds all of your cards
 */
/*help turning HTMLcollection into array from https://stackoverflow.com/questions/222841 */
let cardList = [].slice.call(document.getElementsByClassName('card'));
let count = 0;
let moves = 0;
let starList = [].slice.call(document.getElementsByClassName('fa-star'));
const deck = document.getElementsByClassName('deck')[0];
const movesCounter = document.getElementsByClassName('moves')[0];
const stars = document.getElementsByClassName('stars')[0];

function loadDeck () {
  for (let i = 0; i < cardList.length; i++){
    deck.appendChild(cardList[i]);
  }
};

function loadStars() {
  for (let i = 0; i < starList.length; i++){
    stars.appendChild(starList[i]);
  }
}

function deleteStars(num) {
  if (stars.hasChildNodes()) {
    if (num === 20) {
      starList[0].parentNode.removeChild(starList[0]);
    } else if (num === 28) {
      starList[1].parentNode.removeChild(starList[1]);
    } else if (num === 34) {
      starList[2].parentNode.removeChild(starList[2]);
    }
  }
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 const resetButton = document.getElementsByClassName('restart');
 resetButton[0].addEventListener('click', function() {
   cardList = shuffle(cardList)
   loadDeck();
   loadStars();
   movesCounter.textContent = 0;
   count = 0;
 })

 //Create counter for when a card is clicked to delete stars after X clicks
document.body.addEventListener('click', function(e){
  if (e.target.className === 'card') {
    count += 1;
    deleteStars(count);
    moves = (count/2);
    if (count % 2 === 0) {
      movesCounter.textContent = moves;
    }
    // console.log(matching.length);
    //
    // if matching == e.target.innerHTML {
    //   console.log("Works")
    //   }
    // } else {
    //   matching += e.target;
    //   console.log(e.target);
    //   e.target.classList.add('show');
    // }
    // console.log(matching);
    // console.log(matching.length)
  }
  });


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
