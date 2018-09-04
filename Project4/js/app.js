/**
 * Generate a random number between two numbers.
 *  {number} min The minimum number to return.
 *  {number} max The maximum number to return.
 * return {number} A random number between min and max.
 */
var random = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * The heart image for an item and to display lives left.
 * type string
 */
var heart = '<img src = "images/item-4.png">';


var Enemy = function() {
    this.sprite = 'images/enemy-bug-1.png';
    this.xRange = [-150, 800];
    this.possibleY = [60, 140, 220,300];
    this.speedRange = [150, 700];

    this.reset();
}

Enemy.prototype.reset = function() {
    var startPos = this.xRange[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
}

Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
     /**
     * Add another enemy to the array every 5th level.
     */
     var length = allEnemies.length;

    if (length < 4 + Math.floor(player.level / 5)) {
        allEnemies.push(new Enemy());
    }
     /**
     * Ensures there are only 4 enemies in the array after a reset.
     */
    else if (length > 4 + Math.floor(player.level / 5)) {
        allEnemies.pop();
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
}

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}


var Player = function() {    
    this.xRange = [-2, 802];
    this.yRange = [-20, 480];
    this.x = random(0, 8) * 101;
    this.y = 402;    
    this.exit = random(0, 8);
    this.level = 1;
    this.score = 0;
    this.lives = [heart, heart, heart];
    this.paused = false;
    
}



Player.prototype.update = function() {
   /**
     * Check for enemy collisions.
     */
    var length = allEnemies.length;
    for (var enemy = 0; enemy < length; enemy ++) {

        if (Math.abs(allEnemies[enemy].x - this.x) < 50 &&
            Math.abs(allEnemies[enemy].y - this.y) < 50) {
          
            this.lives.pop();   
            this.reset();
        }
    }

    /**
     * Check for item collisions.
     */
    if (Math.abs(item.x - this.x) < 50 && Math.abs(item.y - this.y) < 66) {

         /**
         * Check item, play correct sound, remove item,
         *     and add to life or score if collision happens.
         */
        if (item.type === 4) {
            this.lives.push(heart);
        }

        else {
            this.score += item.type * 100;
            totalpoints=this.score;
        }

        /**
         * Take the item off screen until the next level or a restart.
         */
        item.x = -101;
    }

    /**
     * Check for first row collisions.
     */
    else if (this.y < 45) {

        /**
         * Increase level, play a sound, create a new item, and
         *     reset player if a door collision happens.
         */
        if (Math.abs(this.exit * 101 - this.x) < 50) {
            this.level ++;
            item = new Item();
        }

        /**
         * Decrease level and play a sound if a water collision happens.
         */
        else {
            this.lives.pop();
        }

        this.reset();
    }

}

Player.prototype.reset = function() {
    /**
     * If lives equals zero, remove the last heart, play a sound,
     *     and ask to quit or restart.  Otherwise, reset the player
     *     position to the bottom row.
     *  dialogue box
     */
    if (this.lives.length === 0) {
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives:  ' + this.lives;
        endGame();

       
    }

    /**
     * Reset player and exit location.
     */

    this.x = random(0, 8) * 101;
    this.y = 402;
    ctx.clearRect(this.exit * 101, 0, 101, 171);
    this.exit = random(0, 8);


}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(avatarImages[avatarIndex]), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 83 < this.yRange[0]) ? 0 : 83;
    } else if (key === 'down') {
        this.y += (this.y + 83 > this.yRange[1]) ? 0 : 83;
    }

    /**
     * Pause or resume the game when space is pressed.
     *  dialogue box
     */
    else if (key=== 'space') {
        if (this.paused) {
            this.paused = false;
        }

        else {
            this.paused = true;
        }
    }


    /**
     * Pause the game and ask to quit or resume when q is pressed.
     *  dialogue box
     */
    else if (key === 'q') {
        this.paused = true;
        var quit = confirm('Press OK to quit or CANCEL to resume.');

        if (quit) {
            window.close();
        }

        else {
            this.paused = false;
        }
    }

}

var Item = function() {
    this.type = random(1, 5);
    this.sprite = 'images/item-' + this.type + '.png';
    this.x = random(0, 8) * 101;
    this.y = random(0, 4) * 83 + 55;
};

/**
 * Operates on an instance of Item and draws the item on the screen.
 */
Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};





document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',      // A
        87: 'up' ,       // W
        68: 'right',     // D
        83: 'down',      // S
        32: 'space',
        81: 'q'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});


var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var allEnemies = [bug1, bug2, bug3, bug4];

var player = new Player();

var item = new Item();



/*variables*/
var renderFlag = false;
var userSelections = [false]; 
var avatarImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ];
var avatarIndex;
var totalpoints=0;
var avatarSelected = ['avatar0', 'avatar1', 'avatar2', 'avatar3', 'avatar4'];
/*helper functions*/

function avatarClick (imgId, imgIndex) {
    avatarIndex = imgIndex;
    var buttons = document.getElementsByClassName('avatarImg'); 
    for (var i = 0; i < 5; i++) {
        document.getElementById(avatarSelected[i]).classList.remove("selector");
        document.getElementById(avatarSelected[i]).className = "avatarImg";
       buttons[i].style.border = '3px solid white';
    }
    document.getElementById(imgId).className = "selector";
    userSelections[0] = true;
}


function startClick () {
    var selectionCount = 0;
    for (var i = 0, length = userSelections.length; i < length; i++) {
        if(userSelections[i] === true) {
           selectionCount++; 
        }
    }
    if (selectionCount === 1) {
        document.getElementById('selectionPopup').style.display = 'none';
        renderFlag = true;
    } else {
        alert('Please select avatar.');
    }
}

function endGame () {
    renderFlag = false;
    document.getElementById('pointsSummary').innerHTML = totalpoints;
    document.getElementById('gameOverPopup').style.display = 'block';
}
