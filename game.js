// Storing the avialbale button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// An array to store the created game pattern
var gamePattern = [];

// An array for user clicked patterns
var userClickedPattern = [];

// Setting level counter and game started or not variable
var started = false;
var level = 0;

// Listening for key press during first time and startover
$(document).on("keypress", function(){
  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    // $("#level-title").text("Level 0");
    started = true;
  }
});


// Detecting which button was clicked
$(".btn").on("click", function() {
  // Obtaining the id of the triggering event
  var userChosenColor = $(this).attr("id");
  // storing the user pattern
  userClickedPattern.push(userChosenColor);
  // playing appropriate sound based on the clicked btn
  playSound(userChosenColor);
  // Create a click animation
  animatePress(userChosenColor);
  // Check the Answer for the last pattern
  checkAnswer(userClickedPattern.length - 1);
});


// Generating a next sequence
function nextSequence() {

  // Reset the user clicked pattern
  userClickedPattern = [];
  // Generaring a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Selecting a random color by using the Rnadomly number as index
  var randomChosenColor = buttonColors[randomNumber];

  // Storing each color in to the game pattern array
  gamePattern.push(randomChosenColor);

  // Creating flash animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // playing the sound
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}


// Checking an answer
function checkAnswer(currentLevel) {
  if ( userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Check if the user finished the level before progressing to next steps
    if (userClickedPattern.length === gamePattern.length) {
      // execute next sequence after 1s
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  }
  else {
    // If the user is wrong in any attempt
    var wrongAudio = new Audio("sounds/wrong.mp3");
      // play wrong audio
    wrongAudio.play();
      // Change bkgd of the HTML to red for 0.2s
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
      // Display the game is over
    $("#level-title").text("Game Over, Press Any Key to Restart");
      // Reset everything
    startOver();
  }
}


// To Play sounds based on name parameter
function playSound(name) {
  // creating a new Audio Object
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// A function to create a click animation
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


// Start over
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
