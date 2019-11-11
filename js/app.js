
let globalCount=0;
//enemy function
const Enemy = function(x, y, speed) {
 //variables initialization
    this.x=x;
    this.y=y;
    this.speed=speed;

    this.sprite = 'images/enemy-bug.png';
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if ( this.x<=505)
    {
        this.x+=this.speed*dt;
    }
    else {
        this.x=0;
    }
    //check for collision as close as possible 
        if( !(this.x<=0) && this.x>=(player.x-50) && (this.x-50)<=player.x && this.y==player.y){
            setTimeout(function(){
        player.reset();
    }, 500);
    }
    //randomize speed of enemies
   this.speed=Math.floor(Math.random() * Math.floor(400));
}

//enemy render function
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player 
const Player= function(x, y) {
    this.x=x;
    this.y=y;
    this.sprite = 'images/char-boy.png';
};


//player render function
Player.prototype.render =   function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function(dt){

//when player reaches water, display winning message then reset
    
     if(this.y<73)
    {
        player.y=player.y;
       setTimeout(function(){
        player.reset();
    }, 1500);
        
    }
};


//reset function returns player to original location
Player.prototype.reset= function(){
    this.x=202;
    this.y=405;
    player.render();
   

    
}


Player.prototype.handleInput = function(key){
    //this ensures player not moving beyond border when corresponding arrow clicked
        if (key==='left' && this.x>0)
        {
            this.x-=101;
            this.render();

        }
        if (key=='right' && this.x<=304)
        {
            this.x+=101;
            this.render();
        }
        if(key=="up" && this.y>0)
        {
            this.y-=83;
            this.render();
        }
        if(key=="down" && this.y<=332)
        {
            this.y+=83;
            this.render();
        }
        let won=document.createElement('p');
won.innerHTML="You won!";
//when player reaches water, display winning message then reset
    if(this.y<0)
    {
        document.getElementById('countdown').appendChild(won);
       setTimeout(function(){
    }, 3000);
        
    }


}


//enemy objects 
const enemy1= new Enemy(-201, 73, 100);
const enemy2= new Enemy(-201, 156, 100);
const enemy3= new Enemy(-201, 239, 100);
const allEnemies = [enemy1, enemy2, enemy3];


//player object
let player = new Player(202, 405);

// This listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    console.log(player.y);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//countdown timer functions
function timerCD(duration, display) {
    let timer = duration, seconds;
    let count=0;
    setInterval(function () {
         if (seconds==0 && count>1 && timer==59)

    {
        alert("Time is over");
        player.reset();

    }
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent ="Time left: "+seconds;
        count++;
        if (--timer < 0) {
            timer = duration;
        }
        //when timer reaches 0, and exclude the starting time
            
    }, 1000);


}
//start the counter by one minute
window.onload = function () {
    let oneMin = 60 * 1,
        display = document.getElementById('countdown');
    timerCD(oneMin, display);
};
