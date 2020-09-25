var player;
var playerData;
var body;
var lastRender = 0;
var width;
var height;
var jump = false;
var gravitySpeed = 10;

window.onload = function setup() {
    console.log("Game is Loaded!");
    body = document.getElementsByTagName("BODY")[0];
    console.log(body);
    playerData = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        pressedKeys: {
            left: false,
            right: false,
            up: false,
            down: false
        }
}
    width = window.innerWidth;
    height = window.innerHeight;d
    getPlayer();
}

var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

function getPlayer() {
    let template = body;
    Array.from(body.children).forEach(e => {
        let eb = e.getBoundingClientRect();
        let sb = template.getBoundingClientRect();
        if (eb.width < sb.width && eb.width > 0) {
            template = e;
        }
    });
    console.log(template);
    player = template.cloneNode();
    playerData.x = template.getBoundingClientRect().x;
    playerData.y = template.getBoundingClientRect().y;
    playerData.width = template.getBoundingClientRect().width;
    playerData.height = template.getBoundingClientRect().height;
    template.disabled = true;
    template.style.color = "lightgray";
    player.innerHTML = template.innerHTML;
    player.setAttribute("id", "player");
    player.style.boxShadow = "0px 0px 5px 2px lightgreen";
    player.style.position = "absolute"
    body.appendChild(player);
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
    if (playerData.pressedKeys.up && jump == true) {
        playerData.y -= progress;
        gravitySpeed = 15;
        jump = false;
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

    gravity(progress);

    player.style.left = `${playerData.x}px`;
    player.style.top = `${playerData.y}px`;
}

function gravity(progress) {
    let collide = false;
    Array.from(body.children).forEach(child => {
        bounds = child.getBoundingClientRect();
        if (bounds.width < 5 || child.id == "player") {return;}

        if (playerData.x > bounds.x && playerData.x < bounds.x + bounds.width) {
            if (playerData.y + playerData.height > bounds.y && playerData.y < bounds.y) {
                collide = true;
            }
        }
    });
    if (!collide) {
        playerData.y += progress - gravitySpeed;
    } else {
        jump = true;
    }
    if (gravitySpeed > 3) { gravitySpeed -= 0.2}
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
