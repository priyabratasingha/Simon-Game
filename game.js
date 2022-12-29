// Varible for the methods
var gamePattern = []; //gamePattern just append the random colour

var userClickedPattern = []; //userClickedPattern just append the colour clicked by the user

var buttonColours = ["red", "blue", "yellow", "green"]; //Button's Colour

var started = false; //One time use for starting the game

var level = -1; //Level of the game starting with -1 increases by one as long as the nextSequence function will be called


// Utility function playSound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Utility function for animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Keypress at the begining of the game it starts the again
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Button clicked by the user
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  CheckAnswer(userClickedPattern.length - 1);

})

// Generate a random color
function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  level++;

  $("#level-title").text("Level " + level);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function CheckAnswer(currentLevel) {
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = -1;
  gamePattern = [];
  started = false;
}
