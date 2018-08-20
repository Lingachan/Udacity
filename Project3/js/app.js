// Declare card symbols
let icons = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

// Create array to hold opened cards
let openCard = [];
let moves = 0;
let starts = 3;
let matchFound = 0;
let startGame = false;
let star = "3";
let timer;

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

// Create each card's HTMl
function createCard() {
  let cardList = shuffle(icons);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// find matching cards
function findMatch() {
  // Show cards on click
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flipIn open show");
    openCard.push($(this));
    startGame = true;
   // Check if classlist matches when openCard length == 2
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("bounceIn", "match");
      openCard[1][0].classList.add("bounceIn", "match");
      $(openCard[0]).off('click');
      $(openCard[1]).off('click');
      matchFound += 1;
      moves++;
      removeOpenCards();
      if(matchFound === 8) {
      findWinner();
    }
      } else {
      // If classes don't match, add "wrong" class
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      // Set timeout to remove "show" and "open" class
      setTimeout(removeClasses, 1100);
      // Reset openCard.length to 0
      setTimeout(removeOpenCards, 1100);
      moves++;
      }
    }
  updateStars();
  })
}

// Update stars
function updateStars() {
  if (moves === 1) {
    $("#movesText").text(" Move");
  } else {
    $("#movesText").text(" Moves");
  }
  $("#moves").text(moves.toString());

  if (moves > 0 && moves < 16) {
    star = star;
  } else if (moves >= 16 && moves <= 20) {
    $("#starOne").removeClass("fa-star");
    star = "2";
  } else if (moves > 20) {
    $("#starTwo").removeClass("fa-star");
    star = "1";
  }
}

// Start timer on the first card click
function startTimer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
 }

// Open popup when game is complete
function findWinner() {
  if (matchFound === 8) {
    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(moves);
    $("#total-stars").text(star);

    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again-btn").on("click", function() {
       location.reload()
   });

   clearInterval(timer);
}
}
// Reset openCard.length to 0
function removeOpenCards() {
  openCard = [];
}

// Remove all classes except "match"
function removeClasses() {
  $(".card").removeClass("show open flipIn bounceIn shake wrong");
  removeOpenCards();
}

// Disable clicks
function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}

// Call functions
shuffle(icons);
createCard();
findMatch();
startTimer();

// Function to restart the game on icon click
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

restartGame();
