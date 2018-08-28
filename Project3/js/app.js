// timer
function timeFormat ( val ) {
  return val > 9 ? val : "0" + val; 
  console.log(timeFormat);
 }
function timer(clicks) {
 $(".card").on("click", function() {
   clicks += 1;
   if (clicks === 1) {
     var sec = 0;
     time = setInterval( function(){
     secTaken = timeFormat(++sec %60);
     $("#sec").html(secTaken);
     minTaken = timeFormat(parseInt(sec / 60, 10))
     $("#min").html(minTaken);
     }, 1000);
   }
 })
 return secTaken, minTaken;
}

// Function to restart the game on icon click
function restartGame() {
  $("#restart").on('click', function() {
  playAgain();
  console.log(secTaken);
  })
}

function playAgain() {
  $(".card").removeClass("show open match flipIt pop shake wrong");
  clearTimeout(time);
  const freezeTime = "00";
  $("#sec").html(freezeTime);
  $("#min").html(freezeTime);
   var click = 0;
   moves = 0;
   starRating = "3";
   stars = 3;
   const move = 0;
   $("#one").addClass("fa-star");
   $("#two").addClass("fa-star");
   $("#three").addClass("fa-star");
   updateStars(moves);
  timer(click);
}
// card symbols
const cardList = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf", "fa-bicycle", "fa-bomb"];
const doubleCardList = cardList.concat(cardList);
// global variables
let openCard = [];
let stars = 3;
let moves = 0;
let similarCard = 0;
let startGame = false;
let starRating = "3";
let clicks = 0;
let time;
let minTaken;
let secTaken;


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

// Update stars
function updateStars(moves) {
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
  } else if (moves > 25) {
    $("#two").removeClass("fa-star");
    starRating = "1";
  }
}


// Create card
function createCard() {
  let cardType = shuffle(doubleCardList);
  cardType.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// Mathching card
function cardMatch() {
  $(".card").on('click', function() {
    if ($(this).hasClass("open show")) {
       return 0; 
      }
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
      if(similarCard === 8) {
      clearTimeout(time);
      gameResult();
      }
      } else {
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      setTimeout(removeClasses, 500);
      setTimeout(closeCards, 500);
      moves++;
      }
    }
  updateStars(moves);
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
    swal({
      title: 'Congratulations',
      type: 'success',
      text: 'You have won the game with ' + moves + ' moves. You got ' + starRating + ' Stars Time Taken is ' + minTaken + ' minutes and ' + secTaken + ' seconds.',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Play Again',
      confirmButtonColor: '#02ccba',
      cancelButtonText: 'Close',
      cancelButtonColor: '#aa7ecd'
  }).then(function() {
      playAgain();
  }, function(close) {
      console.log('Close the Greeting');
  });
 }

// Call functions
shuffle(doubleCardList);
createCard();
cardMatch();
timer(clicks);
restartGame();