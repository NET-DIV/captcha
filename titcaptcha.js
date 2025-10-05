class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    randomize(mag = 1) {
        this.x += (Math.random() - 0.5) * mag;
        this.y += (Math.random() - 0.5) * mag;
    }
}

class TitCaptcha {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        this.value = "";
        this.vectors = [];
        this.animate = true;
        this.generate();
    }

    randomChar() {
        return this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    }

    generate() {
        this.value = "";
        this.vectors = [];
        for (let i = 0; i < 6; i++) {
            this.value += this.randomChar();
            this.vectors.push(new Vector(40 + i * 30, 50 + Math.random() * 10));
        }
        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.font = "bold 32px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // draw background noise
        for (let i = 0; i < 60; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
            ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            ctx.stroke();
        }

        // draw characters
        for (let i = 0; i < this.value.length; i++) {
            const v = this.vectors[i];
            ctx.save();
            ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 40%)`;
            ctx.translate(v.x, v.y);
            ctx.rotate((Math.random() - 0.5) * 0.3);
            ctx.fillText(this.value[i], 0, 0);
            ctx.restore();

            // apply small motion
            if (this.animate) v.randomize(0.3);
        }
    }

    loop() {
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

// initialize
window.addEventListener("load", () => {
    window.titCaptcha = new TitCaptcha("captchaCanvas");
    titCaptcha.loop();
});