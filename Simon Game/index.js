let gamePattern = [];
let usersSequence = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let lvl = 0;
let started = false;

//initiator (starting point)
$(document).on("keydown", function () {
    if (!started) {
        started = true;
        oneRoundHandler();
    }
})
$("div.btn").on("click", function (event) {
    let buttonId = event.target.id;
    PrettyEffects(buttonId)
    usersSequence.push(buttonId);
    checkAnswer();
})

function checkAnswer () {
    let tail = usersSequence.length - 1;
    if (usersSequence[tail] !== gamePattern[tail]) {
        $("h1").text("Game over! Press any key to restart!");
        PlaySound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    } else {
        if (usersSequence.length === gamePattern.length) {
            console.log("man! i am in the else-if statement")
            setTimeout(function () {
                oneRoundHandler();
            }, 300);
        }
    }
}

function oneRoundHandler () {
    lvl++;
    usersSequence = [];
    $("h1").text("Level " + lvl);
    addRandomButton();

}


function addRandomButton () {
    /*
    @description generates a random button, pushes it to the game pattern and highlights it
     */
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    PrettyEffects(randomColor);
}

function PrettyEffects (buttonId) {
    /*
    @description adds audio and visuals
     */
    //visual part

    $("#" + buttonId).addClass("pressed").fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout (function (){
        $("#" + buttonId).removeClass("pressed");
    }, 300);

    //audio part
    PlaySound(buttonId);
}

function PlaySound (name) {
    let audio_name = "sounds/" + name + ".mp3"
    let audio = new Audio(audio_name);
    audio.play();
}

function startOver() {
    gamePattern = [];
    usersSequence = [];
    lvl = 0;
    started = false;
}