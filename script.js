// javascript graphics boilerplate
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// parameters - change to your liking
var STEP_MAX = 2.5;
var STEP_CHANGE = 1.0;
var HEIGHT_MAX = canvas.height;

// starting conditions
var height = Math.random() * HEIGHT_MAX;
var slope = (Math.random() * STEP_MAX) * 2 - STEP_MAX;

var hieght1;

// creating the landscape
for (var x = 0; x < canvas.width; x++) {
    if(x=100)
    {
        height1=height;
    }
    // change height and slope
    height += slope;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

    // clip height and slope to maximum
    if (slope > STEP_MAX) { slope = STEP_MAX };
    if (slope < -STEP_MAX) { slope = -STEP_MAX };

    if (height > HEIGHT_MAX) {
        height = HEIGHT_MAX;
        slope *= -1;
    }
    if (height < 0) {
        height = 0;
        slope *= -1;
    }

    // draw column
    context.beginPath();
    context.moveTo(x, HEIGHT_MAX);
    context.lineTo(x, height);
    context.stroke();
}

//An array used to store key stroke values
var keys = {};
var oneAngle = 45;
var twoAngle = 135;
var oneChange = 1;
var twoChange = -1;

var tanks = function () {
    //This moves the canvas to the base of the gun of the tank
    context.translate(100,hieght1);
    console.log(hieght1);
    context.scale(0.5, 0.5);

    //This part draws the gun. The canvas is translated and then rotated to the guns angle
    //to make drawing the gun easier. Unfortunately it is much prettier to draw the gun first
    //So there has to be a few more transformations and rotations
    context.translate(35, -23)
    context.fillStyle = "grey";
    context.rotate(-oneAngle * Math.PI / 180);
    context.fillRect(-2.5, 0, 35, 5);

    //This rotated the canvas to and angle that matches the angle between the bottom edge of the canvas
    //and the imaginary line created from connecting the hieght of the map at the front and back of the tank.
    context.rotate(oneAngle * Math.PI / 180);
    context.translate(-35, 23);


    //This draws the body of the tank
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(3, -10);
    context.lineTo(15, -30);
    context.lineTo(55, -30);
    context.lineTo(67, -10);
    context.closePath();
    context.fill();

    //This draws the tread
    context.fillStyle = "grey";
    context.fillRect(0, -15, 70, 20);
    context.beginPath();
    context.arc(0, -5, 10, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(70, -5, 10, 0, 2 * Math.PI);
    context.fill();

    //Draws the pattern on the inside of the tank tread
    for (var i = 3; i < 75; i += 16) {

        context.fillStyle = "black";
        context.beginPath();
        context.arc(i, -5, 7, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = "grey";
        context.beginPath();
        context.arc(i, -5, 3, 0, 2 * Math.PI);
        context.fill();

    }
}
 