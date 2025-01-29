var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
document.getElementById("start").onclick = function() {

    if (playing == true) {

        location.reload(); 

    } else {

        playing = true;
        score = 0;
        document.getElementById("score").innerHTML = score;
        let change = document.getElementById("start");
        change.value = "Reset Game"
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameover");

        startCountdown();
        generateQA();
    }

}
for (i = 1; i < 5; i++) {
    document.getElementById("m" + i).onclick = function() {

        if (playing == true) {
            if (this.innerHTML == correctAnswer) {



                score++;
                document.getElementById("score").innerHTML = score;

                hide("tryagain");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000);

            

                generateQA();
            } else {
                //wrong answer
                hide("correct");
                show("tryagain");
                setTimeout(function() {
                    hide("tryagain");
                }, 1000);
            }
        }
    }
}

function startCountdown() {
    action = setInterval(function() {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) { 
            startCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("tryagain");
            playing = false;
            var change1 = document.getElementById("start");
            change1.value = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}


function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}



function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("game").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("m" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

  

    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); 
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("m1" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
