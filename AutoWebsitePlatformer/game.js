var player;
var playerData;
var body;
var lastRender = 0;
var width;
var height;

window.onload = function setup() {
    console.log("Game is Loaded!");
    body = document.getElementsByTagName("BODY")[0];
    console.log(body);
    playerData = {
        x: 0,
        y: 0,
        pressedKeys: {
            left: false,
            right: false,
            up: false,
            down: false
        }
    }
    width = window.innerWidth;
    height = window.innerHeight;
    getPlayer();
}

var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

function getPlayer() {
    player = body;
    Array.from(body.children).forEach(e => {
        let eb = e.getBoundingClientRect();
        let sb = player.getBoundingClientRect();
        if (eb.width < sb.width && eb.width > 0) {
            player = e;
        }
    });
    console.log(player);
    player.style.boxShadow = "0px 0px 5px 2px lightgreen";
    let replacement = document.createElement('div');
    console.log(player.offsetWidth);
    replacement.style.width = `${player.getBoundingClientRect().width}px`;
    replacement.style.height = `${player.getBoundingClientRect().height}px`;
    // replacement.style.display = "block";
    replacement.style.backgroundColor = "blue"
    console.log(player.getBoundingClientRect());
    body.insertBefore(replacement, body.children[0]);
    playerData.x = player.getBoundingClientRect().x;
    playerData.y = player.getBoundingClientRect().y - player.getBoundingClientRect().height;

    player.style.position = "absolute"
    startGame();
}

function startGame() {
    window.requestAnimationFrame(loop);
}

function update(progress) {
    if (!player) {return;}
    progress = progress/2;

    if (playerData.pressedKeys.left) {
        playerData.x -= progress;
    }
    if (playerData.pressedKeys.right) {
        playerData.x += progress;
    }
    if (playerData.pressedKeys.up) {
        playerData.y -= progress;
    }
    if (playerData.pressedKeys.down) {
        playerData.y += progress;
    }
    
    // Flip position at boundaries
    if (playerData.x > window.width) {
        playerData.x -= window.width;
    }
    else if (playerData.x < 0) {
        playerData.x += window.width;
    }
    if (playerData.y > window.height) {
        playerData.y -= window.height;
    }
    else if (playerData.y < 0) {
        playerData.y += window.height;
    }

    player.style.left = `${playerData.x}px`;
    player.style.top = `${playerData.y}px`;
}

function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

function keydown(event) {
    var key = keyMap[event.keyCode];
    playerData.pressedKeys[key] = true;
  }
  function keyup(event) {
    var key = keyMap[event.keyCode];
    playerData.pressedKeys[key] = false;
  }

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
