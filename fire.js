var score1=0;
var score2=0;
var collision=0;
var exp = new Image();
exp.src="assets/projectiles/explosion2.gif";

function weapon(radius1, damage1) {
    radius1 = 15;
    damage1 = 50;
}

function fire(player,playerscore,posx, posy, power, angle) {

    var pro = new weapon(radius, damage);
    var pro = {
        xpos: 100, //start pos x
        ypos: 400, //start pos y
        // r: radius, //radius
        velocity: 80, //init velocity
        theta: 45 //angle
    };

    pro.velocity = power;
    pro.theta = angle;
    pro.xpos = posx;
    pro.ypos = posy;



    var frameCount = 0;
    var velx = pro.velocity * Math.cos(pro.theta * Math.PI / 180);
    var vely = pro.velocity * Math.sin(pro.theta * Math.PI / 180);
    var startX = pro.xpos;
    var startY = pro.ypos;
    var g = 9.8;

    setInterval(function () {
        //smooth clear
        //c.save();
        //	c.fillStyle = "rgba(0, 0, 0, .2)";
        //	c.fillRect(0, 0, canvas.width, canvas.height);
        //c.restore();

        if (pro.ypos < canvas.height - pro.r)
            pro.ypos = startY - (v0y * frameCount - (1 / 2 * g * Math.pow(frameCount, 2)));
        if (pro.xpos > canvas.width - pro.r)
            pro.xpos = startX + v0x * frameCount;

        if (pro.xpos == x && pro.ypos >= y) {
            collisiontest();
            if(collision==1){
                explosion(playerscore);
                collision=0;
            }
        }

        c.save();
        c.beginPath();
        c.fillStyle = "rgba(0, 200, 0, 0.6)";
        c.arc(pro.xpos, pro.ypos, pro.r, 0, Math.PI * 2, true);
        c.fill();
        c.stroke();
        c.closePath();
        c.restore();
        frameCount += .1;
    }, 1000 / 77);
}

function collisiontest() {
    for (x = 0; x < 1600; x++) {
        if (pro.xpos + radius ==x&&mapHeight[x]==pro.ypos) {
           collision=1; 
        }
    }
}

function explosion(score){
    var a=xpos-tankx;
    var b=ypos-tanky;
    var p= Math.sqrt(a*a+b*b);
    c.drawImage(exp,xpos,ypos);
    if(p<500){
        score+=500-p;
    }


}