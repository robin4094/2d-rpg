const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let offset;
let playerPosition;

canvas.width = 1000;
canvas.height = 700;
offset = { x: -180, y: -570 };
playerPosition = { x: 75, y: 305 };

const backGroundImage = new Image();
backGroundImage.src = "./background.png"
const playerUpImage = new Image();
playerUpImage.src = "./up_all.png"
const playerDownImage = new Image();
playerDownImage.src = "./down_all.png"
const playerLeftImage = new Image();
playerLeftImage.src = "./left_all.png"
const playerRightImage = new Image();
playerRightImage.src = "./right_all.png";
const keys = {
    up: { pressed: false },
    left: { pressed: false },
    down: { pressed: false },
    right: { pressed: false }
};



class Sprite {
    constructor({
        position,
        image,
        scale = 1,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0
    }) {
        this.position = position;
        this.scale = scale;
        this.image = new Image();
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max) * this.scale;
            this.height = this.image.height * this.scale;
        };
        this.image.src = image.src;
        this.moving = false;
        this.sprites = sprites;
        this.animate = animate;
        this.rotation = rotation;
    }
    draw() {
        canvasContext.save();
        canvasContext.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
        canvasContext.rotate(this.rotation);
        canvasContext.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        );
        canvasContext.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
        canvasContext.restore();
        if (!this.animate) return;
    }
}

const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: backGroundImage
});

const player = new Sprite({
    position: { x: canvas.width / 2 - 40, y: canvas.height / 2 - 40 },
    image: playerDownImage,
    frames: { max: 4, hold: 20 },
    sprites: { up: playerUpImage, left: playerLeftImage, down: playerDownImage, right: playerRightImage }

})

function animate() {
    const animationId = window.requestAnimationFrame(animate);
    background.draw();
    player.draw();
    let moving = true;
    player.animate = false;
    if (keys.up.pressed) {
        player.animate = true;
        player.image = player.sprites.up;
    }
    if(keys.down.pressed) {
        player.animate = false;
        player.image = player.sprites.down;
    }
    if(keys.right.pressed) {
        player.animate = false;
        player.image = player.sprites.right;
    }
    if(keys.left.pressed) {
        player.animate = false;
        player.image = player.sprites.left;
    }
}
addEventListener('keydown', (event) => {
    switch (event.key) {
        case "w":
            keys.up.pressed = true;
            break;
        case "a":
            keys.left.pressed = true;
            break;
        case "s":
            keys.down.pressed = true;
            break;
        case "d":
            keys.right.pressed = true;
            break;
    }
    // if (event.key === 'w') keys.up.pressed = true;
    // else if (event.key ==='a') keys.left.pressed = true
    // else if (event.key ==='s') keys.down.pressed = true
    // else if (event.key ==='d') keys.right.pressed = true
});
addEventListener('keyup', (event) => {
    switch (event.key) {
        case "w":
            keys.up.pressed = false;
            break;
        case "a":
            keys.left.pressed = false;
            break;
        case "s":
            keys.down.pressed = false;
            break;
        case "d":
            keys.right.pressed = false;
            break;
    }
});
addEventListener('keyright', (event) => {
    switch (event.key) {
        case "w":
            keys.up.pressed = false;
            break;
        case "a":
            keys.left.pressed = false;
            break;
        case "s":
            keys.down.pressed = false;
            break;
        case "d":
            keys.right.pressed = false;
            break;
    }
});
addEventListener('keyleft', (event) => {
    switch (event.key) {
        case "w":
            keys.up.pressed = false;
            break;
        case "a":
            keys.left.pressed = false;
            break;
        case "s":
            keys.down.pressed = false;
            break;
        case "d":
            keys.right.pressed = false;
            break;
    }
});



animate();

