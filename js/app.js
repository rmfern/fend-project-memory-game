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
let sec = 0;
let starCount = 3;

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
      starCount--
    } else if (num === 28) {
      $('.fa-star').first().remove();
      starCount--
    } else if (num === 34) {
      $('.fa-star').first().remove();
      starCount--
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

 // Restart at end of game or at user's choice

$('.restart').click(function(){
  $('.modal').css('display', 'none');
  loadDeck();
  loadStars();
  movesCounter.textContent = 0;
  count = 0;
  sec = 0;
});

function pad ( val ) { return val > 9 ? val : "0" + val; };

 //Create counter for when a card is clicked to delete stars after X clicks
$('.deck').click(function(e){
  if (!($(e.target).hasClass('open') || $(e.target).hasClass('match')) ) {
    if ($(e.target).hasClass('card')) {
      count += 1;
      deleteStars(count);
      moves = (count/2);

      if (count === 1) {
      // timer function from unknown website - link lost when computer rebooted

      setInterval( function(){
          $("#seconds").html(pad(++sec%60)).one();
          $("#minutes").html(pad(parseInt(sec/60,10)) + ':').one();
      }, 1000);

      $('#minutes').css('display', 'inline');
      $('#seconds').css('display', 'inline');
      };

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

          if (matchCount === 8) {
            time = sec;
            minutes = pad(parseInt(time/60/10));
            seconds = pad(++time%60);
            starHTML = "<i class='fa fa-star'></i>";
            $('#congrats').append("<p>Your time was " + minutes + " minutes and " + seconds + " seconds!</p>");
            $('#congrats').append("<p>You earned " + starCount + " stars this round. " + starHTML.repeat(starCount));
            $('.modal').css('display', 'block');
          }

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
