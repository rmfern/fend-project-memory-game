/*
 * Create a list that holds all of your cards
 */
/*help turning HTMLcollection into array from https://stackoverflow.com/questions/222841 */
let cardList = ['eye', 'fighter-jet', 'fire', 'flag', 'futbol-o', 'glass', 'male', 'female', 'eye', 'fighter-jet', 'fire', 'flag', 'futbol-o', 'glass', 'male', 'female'];
let count = 0;
let moves = 0;
const deck = $(".deck")[0];
const movesCounter = $(".moves")[0];
const stars = $(".stars")[0];
let tempCard = "";
let tempClass = "";
let matchCount = 0;

function loadDeck () {
  shuffle(cardList);
  $('.deck').empty();
  for (let i = 0; i < cardList.length; i++){
    $('.deck').append("<li class='card'><i class='fa fa-" + cardList[i] + "'></i></li>");
    $('fa fa-'+ cardList[i]).on('click', function(){console.log('this works')});
  }
};

function loadStars() {

  $('.stars').empty();
  for (let i = 0; i < 3; i++){
    $('.stars').append("<li><i class='fa fa-star'></i></li>");
  }
};

function deleteStars(num) {
  if (stars.hasChildNodes()) {
    if (num === 20) {
      $('.fa-star').first().remove();
    } else if (num === 28) {
      $('.fa-star').first().remove();
    } else if (num === 34) {
      $('.fa-star').first().remove();
    }
  }
};



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 loadDeck();

$('.restart').click(function(){
  loadDeck();
  loadStars();
  movesCounter.textContent = 0;
  count = 0;
});


 //Create counter for when a card is clicked to delete stars after X clicks
$('.deck').click(function(e){
  if (!($(e.target).hasClass('open') || $(e.target).hasClass('match')) ) {

    if ($(e.target).hasClass('card')) {
      count += 1;
      deleteStars(count);
      moves = (count/2);

      if (count % 2 !== 0) {
        tempClass = $(e.target)
        tempClass.toggleClass('open show');
        tempCard = $(e.target).children().attr('class');
        console.log(tempCard)
      } else {
        movesCounter.textContent = moves;
        $(e.target).toggleClass('open show');

        if ($(e.target).children().hasClass(tempCard)) {
          tempClass.toggleClass('open show match');
          $(e.target).toggleClass('open show match');
          matchCount++;
        } else {
          setTimeout(function() {
            tempClass.toggleClass('open show');
            $(e.target).toggleClass('open show');
          }, 600);
        }
      }
    }
  } else {
    console.log('card is open');
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
