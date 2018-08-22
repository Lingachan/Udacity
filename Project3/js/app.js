// timer
function timeFormat ( val ) {
  return val > 9 ? val : "0" + val; 
 }

function timer() {
 let timer;
 let clicks = 0;
 $(".card").on("click", function() {
   clicks += 1;
   if (clicks === 1) {
     var sec = 0;
     timer = setInterval( function(){
       $("#sec").html(timeFormat(++sec % 60));
       $("#min").html(timeFormat(parseInt(sec / 60, 10)));
     }, 1000);
   }
 })
}

// Function to restart the game on icon click
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

// card symbols
let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// global variables
let openCard = [];
let moves = 0;
let starts = 3;
let similarCard = 0;
let startGame = false;
let starRating = "3";

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
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

// Create card
function createCard() {
  let cardType = shuffle(cards);
  cardType.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// Update stars
function updateStars() {
  if (moves === 1) {
    $("#moveTxt").text(" Move");
  } else {
    $("#moveTxt").text(" Moves");
  }
  $("#moves").text(moves.toString());

  if (moves > 0 && moves < 16) {
    starRating = starRating;
  } else if (moves >= 16 && moves <= 24) {
    $("#one").removeClass("fa-star");
    starRating = "2";
  } else if (moves > 24) {
    $("#two").removeClass("fa-star");
    starRating = "1";
  }
}

// Mathching card
function cardMatch() {
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flipIt open show");
    openCard.push($(this));
    startGame = true;
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("pop", "match");
      openCard[1][0].classList.add("pop", "match");
      $(openCard[0]).off('click');
      $(openCard[1]).off('click');
      similarCard += 1;
      moves++;
      closeCards();
      gameResult();
      } else {
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      setTimeout(removeClasses, 500);
      setTimeout(closeCards, 500);
      moves++;
      }
    }
  updateStars();
  })
}

// Reset openCard.length to 0
function closeCards() {
  openCard = [];
}

// Remove all classes
function removeClasses() {
  $(".card").removeClass("show open flipIt pop shake wrong");
  closeCards();
}

// Disable clicks
function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}

// Open popup
function gameResult() {

  if (similarCard === 8) {
    swal({
      title: 'Congratulations',
      type: 'success',
      text: 'You have won the game with ' + moves + '. You got ' + starRating + ' Stars.',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Play Again',
      confirmButtonColor: '#02ccba',
      cancelButtonText: 'Close',
      cancelButtonColor: '#aa7ecd'
  }).then(function() {
      location.reload();
  }, function(dismiss) {
      console.log('Yes');
  });
 }
}

// Call functions
shuffle(cards);
createCard();
cardMatch();
timer();
restartGame();