// Custom Cursor (your existing code)
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.classList.add('cursor-follower');
document.body.appendChild(follower);

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.top = mouseY + 'px';
  cursor.style.left = mouseX + 'px';
});

function animateCursor() {
  posX += (mouseX - posX) / 8;
  posY += (mouseY - posY) / 8;
  follower.style.top = posY + 'px';
  follower.style.left = posX + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ------------------- Comet Trails Background -------------------

// Canvas setup
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Trail particles
let comets = [];
const maxComets = 150;

class Comet {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(169,180,194,${Math.random() * 0.8 + 0.2})`;
    }
    update(){
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += this.vx + (mouseX - this.x) * 0.01;
        this.y += this.vy + (mouseY - this.y) * 0.01;

        if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw(){
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

function initComets(){
    comets = [];
    for(let i = 0; i < maxComets; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        comets.push(new Comet(x, y));
    }
}
initComets();

function animateComets(){
    // Slight fade for trailing effect
    ctx.fillStyle = "rgba(30,30,30,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    comets.forEach(c => {
        c.update();
        c.draw();
    });

    requestAnimationFrame(animateComets);
}
animateComets();

