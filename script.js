// javascript graphics boilerplate
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
//An array used to store key stroke values
var keys = {};
var player=1;
var oneAngle = 45;
var twoAngle = 135;
var onePower=50;
var twoPower=50;
var oneChange = 1;
var twoChange = -1;
var volley=5;
var mapHeight=[];
var tank1 = new Image();
tank1.onload=function(){
    //load the image
};
tank1.src ="assets/tankA.png";
var tank2=new Image();
tank2.onload=function(){
    //load the image
};
tank2.src="assets/tankB.png";
var tank1x=400;
var tank2x=1500;
var tank1y=400;
var tank2y=400;

// parameters - change to your liking
var STEP_MAX = 2.5;
var STEP_CHANGE = 1.0;
var HEIGHT_MAX = canvas.height;
var HEIGHT_MIN = canvas.height / 2
var x;
// starting conditions
var height = ((2 * Math.random() + 1) / 3) * HEIGHT_MAX;
var slope = (Math.random() * STEP_MAX) * 2 - STEP_MAX;

for (x = 0; x < 300; x++) {
    height = 400;
    c.beginPath();
    c.moveTo(x, HEIGHT_MAX);
    c.lineTo(x, height);
    c.stroke();
}

for (x = canvas.width - 300; x < canvas.width; x++) {
    height = 400;
    c.beginPath();
    c.moveTo(x, HEIGHT_MAX);
    c.lineTo(x, height);
    c.stroke();
}

// creating the landscape
for (x = 300; x < canvas.width - 300; x++) {
    // change height and slope
    height += slope;
    mapHeight[x]=height;
    slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

    // clip height and slope to maximum
    if (slope > STEP_MAX) { slope = STEP_MAX };
    if (slope < -STEP_MAX) { slope = -STEP_MAX };

    if (height > HEIGHT_MAX) {
        height = HEIGHT_MAX;
        slope *= -1;
    }
    if (height < HEIGHT_MAX / 3) {
        height = (HEIGHT_MAX / 3);
        slope *= -1;
    }

    // draw column
    c.beginPath();
    c.moveTo(x, HEIGHT_MAX);
    c.lineTo(x, height);
    c.strokeStyle="brown";
    c.stroke();
}

drawFireButton();

//Draws the button to open up the weapons menu
drawWeapons();

//Draws the grey line seperating the controls from the map
c.fillStyle = "grey";
c.fillRect(0, 500, 1600, 3);
//Draws the angle, power and move bar for the first time so they are there when the screen generates.
drawAngle(oneAngle);
drawPowerBar(onePower);
drawMove(4);

drawtankimg(tank1,tank1x,tank1y,80,50);
drawtankimg(tank2,tank2x,tank2y,80,50);

document.addEventListener('keydown',function(e){
    if(e.keyCode==39&&player==1){
        onePower+=1;
        drawPowerBar(onePower);
    }
    if(e.keyCode==37&&player==1){
        onePower-=1;
        drawPowerBar(onePower);
    }
    if(e.keyCode==38&&player==1){
        oneAngle+=1;
        drawAngle(oneAngle);
    }
    if(e.keycode==40&&player==1){
        oneAngle-=1;
        drawAngle(oneAngle);
    }
    if(e.keycode==32&&player==1){
        fire();
    }
},false);

//Draws both of the tanks
//drawTank(100, 72, "blue");
//drawTank(1500, 130, "red");

function drawtankimg(tank,tankx,tanky,tankWidth,tankHeight){
    c.drawImage(tank,tankx,tanky,tankWidth,tankHeight);
}


/*function drawTank(x, angle, color) {

    //Gotta save the canvas to prevent the changes made while drawing the thank from throwing everything
    c.save();

    tankangle = -Math.atan(([x + 60] - mapHeight[x]) / 70);


    //This moves the canvas to the base of the gun of the tank
    c.translate(x, 500 - mapHeight[x]);

    //This part draws the gun. The canvas is translated and then rotated to the guns angle
    //to make drawing the gun easier. Unfortunately it is much prettier to draw the gun first
    //So there has to be a few more transformations and rotations
    c.rotate(-Math.atan((mapHeight[x + 70] - mapHeight[x]) / 70));
    c.translate(35, -23)
    c.rotate(Math.atan((mapHeight[x + 70] - mapHeight[x]) / 70));
    c.fillStyle = "green";
    c.rotate(-angle * Math.PI / 180);
    c.fillRect(-2.5, 0, 35, 5);


    //This rotated the canvas to and angle that matches the angle between the bottom edge of the canvas
    //and the imaginary line created from connecting the hieght of the map at the front and back of the tank.
    c.rotate(angle * Math.PI / 180);
    c.rotate(tankangle);
    c.translate(-35, 23);


    //This draws the body of the tank
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(3, -10);
    c.lineTo(15, -30);
    c.lineTo(55, -30);
    c.lineTo(67, -10);
    c.closePath();
    c.fill();

    //This draws the tread
    c.fillStyle = "grey";
    c.fillRect(0, -15, 70, 20);
    c.beginPath();
    c.arc(0, -5, 10, 0, 2 * Math.PI);
    c.fill();
    c.beginPath();
    c.arc(70, -5, 10, 0, 2 * Math.PI);
    c.fill();

    //Draws the pattern on the inside of the tank tread
    for (var i = 3; i < 75; i += 16) {

        c.fillStyle = "black";
        c.beginPath();
        c.arc(i, -5, 7, 0, 2 * Math.PI);
        c.fill();
        c.fillStyle = "grey";
        c.beginPath();
        c.arc(i, -5, 3, 0, 2 * Math.PI);
        c.fill();

    }

    c.restore();

}*/

//This (obviously) draws the fire button
function drawFireButton() {
    c.fillStyle = "gold";
    c.lineWidth = "8";
    c.strokeRect(590, 520, 120, 60);
    c.fillStyle = "rgba(200, 200, 200, 1)";
    c.fillRect(590, 520, 120, 60);
    c.fillStyle = "red";
    c.font = "60px Ariel";
    c.fillText("Fire", 602, 570);
}

//This helps the draw angle function by drawing the arrows
function drawArrow(start, direction){
    c.beginPath();
    c.moveTo(start, 525);
    c.lineTo(start+5*direction, 525);
    c.lineTo(start+20*direction, 550);
    c.lineTo(start+5*direction, 575);
    c.lineTo(start, 575);
    c.lineTo(start+10*direction, 550);
    c.closePath();
    c.fill();
}

//This will draw the power bar
function drawPowerBar(power) {

    //This draws the boxes that it is contained in
    c.fillStyle = "grey";
    c.lineWidth = "8";
    c.strokeRect(800, 520, 340, 60);
    c.strokeRect(730, 520, 60, 60);
    c.strokeRect(1150, 520, 60, 60);
    c.strokeRect(1220, 520, 60, 60);
    c.fillStyle = "rgba(200,200,200,1)";
    c.fillRect(800, 520, 340, 60);
    c.fillRect(730, 520, 60, 60);
    c.fillRect(1150, 520, 60, 60);
    c.fillRect(1220, 520, 60, 60);

    //This draws the powerbar
    c.fillStyle = "red";
    c.fillRect(800, 520, power * 3.4, 60);

    //This draws the notches that mark every 10 power
    c.fillStyle = "grey";
    for (var i = 800; i <= 1140; i += 34) {
        if (i === 1220) {
            i -= 3;
        }
        if (i === 880) {
            i += 3;
        }
        c.fillRect(i - 3, 520, 6, 10);
        c.fillRect(i - 3, 570, 6, 10);
        if (i === 883) {
            i -= 3;
        }
    };

    //This draws the bar at the end of the power bar
    c.fillStyle = "rgba(50, 50, 50, 1)";
    c.fillRect((power * 3.4) + 797, 520, 6, 60);

    //This draws the arrows in the buttons
    c.fillStyle = "black";
    drawArrow(1155, 1);
    drawArrow(1170, 1);
    drawArrow(1185, 1);
    drawArrow(755, -1);
    drawArrow(770, -1);
    drawArrow(785, -1);

    //This writes the power to the screen
    c.font = "50px Ariel";
    c.fillText(power, 1225, 567);
}

//This function draws the buttons used for moving the tank
function drawMove(movesLeft) {
    c.fillStyle = "grey";
    c.lineWidth = "8";
    c.strokeRect(1300, 520, 60, 60);
    c.strokeRect(1370, 520, 60, 60);
    c.strokeRect(1440, 520, 60, 60);
    c.fillStyle = "rgba(200, 200, 200, 1)";
    c.fillRect(1300, 520, 60, 60);
    c.fillRect(1370, 520, 60, 60);
    c.fillRect(1440, 520, 60, 60);

    //This draws the arrows in the buttons
    c.fillStyle = "black";
    drawArrow(1325, -1);
    drawArrow(1340, -1);
    drawArrow(1355, -1);
    drawArrow(1445, 1);
    drawArrow(1460, 1);
    drawArrow(1475, 1);

    //This writes the movesLeft to the screen
    c.font = "50px Ariel";
    c.fillText(movesLeft, 1385, 567);
}

function drawAngle(angle) {

    //Draws the angle icon
    c.lineWidth = "8";
    c.strokeStyle = "grey";
    c.strokeRect(100, 520, 400, 60);
    c.strokeRect(30, 520, 60, 60);
    c.strokeRect(510, 520, 60, 60),
        c.fillStyle = "rgba(200,200,200,1)";
    c.fillRect(100, 520, 400, 60);
    c.fillRect(30, 520, 60, 60);
    c.fillRect(510, 520, 60, 60);

    //This draws the various angles and tick marks in the angle desplay
    anglePosition = 110;
    c.fillStyle = "black";
    for (var i = angle - 13; i < angle + 12; i++) {

        //Makes sure the angle desplayed is within 0 and 360
        if (i >= 360) {
            change = -360;
        }
        else if (i < 0) {
            change = 360;
        }
        else {
            change = 0;
        }

        if (i % 5 === 0) {
            marker(i, angle);
            anglePosition -= 5;
            c.font = "20px Ariel"
            c.fillText(i + change, anglePosition, 555);
            anglePosition += 30;
        }
        else {
            marker(i, angle);
            c.font = "40px Ariel";
            c.fillText("|", anglePosition, 560);
            anglePosition += 40 / 3;
        }
    }

    drawArrow(515, 1);
    drawArrow(530, 1);
    drawArrow(545, 1);
    drawArrow(55, -1);
    drawArrow(70, -1);
    drawArrow(85, -1);
}

function marker(i, angle) {
    if (i === angle) {
        c.fillStyle = "red";
        c.beginPath();
        c.moveTo(anglePosition - 1, 510);
        c.lineTo(anglePosition + 9, 510);
        c.lineTo(anglePosition + 4, 530);
        c.closePath();
        c.fill();
        c.beginPath();
        c.moveTo(anglePosition - 1, 590);
        c.lineTo(anglePosition + 9, 590);
        c.lineTo(anglePosition + 4, 570);
        c.closePath();
        c.fill();
        c.fillStyle = "black";
        
    }
}

//This function draws the weapons menu button
function drawWeapons() {

    //This draws the background box
    c.fillStyle = "grey";
    c.lineWidth = "8";
    c.strokeRect(1520, 520, 60, 60);
    c.fillStyle = "rgba(200, 200, 200, 1)";
    c.fillRect(1520, 520, 60, 60);
    c.fillStyle = "black";

    c.font = "20px ariel";
    c.fillText("||", 1550, 556);


}

function checkPower(power) {
    if (power === "LeftTank") {
        if (tankOnePower > 99) {
            tankOnePower = 99;
        }
        if (tankOnePower < 0) {
            tankOnePower = 0;
        }
    }
    else {
        if (tankTwoPower > 99) {
            tankTwoPower = 99;
        }
        if (tankTwoPower < 0) {
            tankTwoPower = 0;
        }
    }
}
