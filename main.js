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
    position: { x: offset.x, y: offset.y}, 
    image: backGroundImage
}); 
console.log(background.position)
function animate() {
    const animationId = window.requestAnimationFrame(animate);
    background.draw();
}
animate();