// might change to a different idea later, but for now this is the particle background
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 100 };
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.connectionDistance = 125;
        this.mouseConnectionRadius = 200;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth * this.devicePixelRatio;
        this.canvas.height = window.innerHeight * this.devicePixelRatio;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    }

    createParticles() {
        const particleCount = this.getParticleCount();
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width / this.devicePixelRatio,
                y: Math.random() * this.canvas.height / this.devicePixelRatio,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5, 
                speedY: (Math.random() - 0.5) * 0.5, 
                density: Math.random() * 30 + 1
            });
        }
    }

    // for diff screen sizes
    getParticleCount() {
        const width = window.innerWidth;
        if (width < 768) return 150;     
        if (width < 1024) return 250;    
        return 300;                      
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
        
        const isInHeroSection = window.scrollY < window.innerHeight;
        
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = this.canvas.width / this.devicePixelRatio;
            if (particle.x > this.canvas.width / this.devicePixelRatio) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height / this.devicePixelRatio;
            if (particle.y > this.canvas.height / this.devicePixelRatio) particle.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = document.body.classList.contains('dark-mode') 
                ? `rgba(96, 165, 250, ${isInHeroSection ? 0.8 : 0.5})` 
                : `rgba(0, 0, 0, ${isInHeroSection ? 0.2 : 0.3})`;
            this.ctx.fill();

            this.drawConnections(particle, i);
        }
    }

    drawConnections(particle, index) {
        for (let j = index + 1; j < this.particles.length; j++) {
            const dx = particle.x - this.particles[j].x;
            const dy = particle.y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.connectionDistance) {
                let opacity = 1 - (distance / this.connectionDistance);

                if (this.mouse.x && this.mouse.y) {
                    const mouseDistance = Math.sqrt(
                        Math.pow(this.mouse.x - particle.x, 2) + 
                        Math.pow(this.mouse.y - particle.y, 2)
                    );
                    if (mouseDistance < this.mouseConnectionRadius) {
                        opacity *= 4; 
                    }
                }

                this.ctx.beginPath();
                this.ctx.strokeStyle = document.body.classList.contains('dark-mode')
                    ? `rgba(96, 165, 250, ${opacity * 0.4})`
                    : `rgba(0, 0, 0, ${opacity * 0.3})`;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
            }
        }
    }

    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
}); 