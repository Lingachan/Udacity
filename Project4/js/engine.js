var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 808;
    canvas.height = 595;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        if (!player.paused) {
            update(dt);
            render();
        }

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {
         /**
         * Sets the initial header.
         */
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives:  ' +
        player.lives.join(' ');
        document.getElementsByClassName('level')[0].innerHTML = 'Level:  ' +
        player.level;
        document.getElementsByClassName('score')[0].innerHTML = 'Score:  ' +
        player.score;

        var canvasImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png'
            ],

            noRows = 6,
            noCols = 8,
            row, col;
        /* exit point setter*/
        for (row = 0; row < noRows; row++) {
            for (col = 0; col < noCols; col++) {
                if (row == 0 && col == player.exit) {
                    ctx.drawImage(Resources.get('images/grass-block.png'), col * 101, row * 83);
                }

                else {
                    ctx.drawImage(Resources.get(canvasImages[row]), col * 101, row * 83);
                }
            }
        }

        renderEntities();
    }

    function renderEntities() {
        if (renderGame === true){
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            player.render();
            item.render();
        }
    }

    Resources.load([
        'images/Gem Blue.png',
        'images/door.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug-1.png',
        'images/item-1.png',
        'images/item-2.png',
        'images/item-3.png',
        'images/item-4.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
        

    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
