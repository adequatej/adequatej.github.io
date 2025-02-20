class CursorEffect {
    constructor() {
        this.cursor = this.createCursor();
        this.particles = [];
        this.lastX = 0;
        this.lastY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.speed = 0.2;
        this.particleLifespan = 1000;
        this.mode = localStorage.getItem('cursorMode') || 'trail';
        
        this.cursorStyles = {
            trail: { name: 'Stream', icon: '💫', color: 'var(--primary-color)' },
            spray: { name: 'Sparks', icon: '✨', color: '#FFD700' },
            ripple: { name: 'Ripple', icon: '🌊', color: '#4169E1' }
        };
        
        this.modes = Object.keys(this.cursorStyles);
        this.currentModeIndex = this.modes.indexOf(this.mode);
        
        this.positions = [];
        this.maxPositions = 5;
        this.lastParticleTime = 0;
        this.particleInterval = 5;
        this.velocity = { x: 0, y: 0 };
        this.lastTimestamp = 0;
        
        this.initializeToggle();
        this.init();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        return cursor;
    }

    initializeToggle() {
        const toggle = document.getElementById('cursor-toggle');
        const dropdown = document.querySelector('.cursor-dropdown');
        const cursorIcon = toggle.querySelector('.cursor-icon');
        
        cursorIcon.textContent = this.cursorStyles[this.mode].icon;
        document.querySelector(`[data-mode="${this.mode}"]`).classList.add('active');
        
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        document.querySelectorAll('.cursor-option').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const mode = button.dataset.mode;
                this.setMode(mode);
                cursorIcon.textContent = this.cursorStyles[mode].icon;
                
                document.querySelectorAll('.cursor-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                dropdown.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
            toggle.classList.remove('active');
        });
    }

    setMode(mode) {
        
        this.cursor.style.transition = 'transform 0.3s ease';
        this.cursor.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.mode = mode;
            localStorage.setItem('cursorMode', mode);
            this.cursor.style.transform = '';
        }, 150);
    }

    createParticle(x, y, angle) {
        switch(this.mode) {
            case 'spray':
                return this.createSparkParticle(x, y);
            case 'ripple':
                return this.createRippleParticle(x, y);
            default:
                return this.createStreamParticle(x, y, angle);
        }
    }

    createStreamParticle(x, y, angle) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        const normalizedSpeed = Math.min(Math.max(speed, 0.5), 2);
        
        particle.style.width = `${10 * normalizedSpeed}px`;
        particle.style.height = '1.5px';
        particle.style.transform = `rotate(${angle}deg)`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = '0.8';
        
        document.body.appendChild(particle);
        return {
            element: particle,
            createdAt: Date.now(),
            x, y,
            angle,
            maxLife: 100
        };
    }

    createSparkParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'spray-particle';
        
        const size = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        return {
            element: particle,
            createdAt: Date.now(),
            x, y,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            maxLife: 600
        };
    }

    createRippleParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'ripple-particle';
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        return {
            element: particle,
            createdAt: Date.now(),
            x, y,
            maxLife: 800
        };
    }

    updateVelocity(currentX, currentY, timestamp) {
        const deltaTime = timestamp - this.lastTimestamp;
        if (deltaTime > 0) {
            this.velocity = {
                x: (currentX - this.currentX) / deltaTime * 16,
                y: (currentY - this.currentY) / deltaTime * 16
            };
        }
        this.lastTimestamp = timestamp;
    }

    updateCursorTrail(currentX, currentY, timestamp) {
        this.updateVelocity(currentX, currentY, timestamp);
        
        this.positions.unshift({ 
            x: currentX, 
            y: currentY, 
            time: timestamp,
            velocity: { ...this.velocity }
        });
        
        if (this.positions.length > this.maxPositions) {
            this.positions.pop();
        }

        if (this.positions.length < 2) return;

        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (speed > 0.1 && timestamp - this.lastParticleTime >= this.particleInterval) {
            const angle = Math.atan2(this.velocity.y, this.velocity.x) * 180 / Math.PI;
            
            const offsetDistance = 5;
            const offsetX = currentX - (this.velocity.x / speed) * offsetDistance;
            const offsetY = currentY - (this.velocity.y / speed) * offsetDistance;
            
            this.particles.push(this.createStreamParticle(offsetX, offsetY, angle));
            this.lastParticleTime = timestamp;
        }
    }

    updateParticles() {
        const currentTime = Date.now();
        
        this.particles = this.particles.filter(particle => {
            const age = currentTime - particle.createdAt;
            if (age > particle.maxLife) {
                particle.element.remove();
                return false;
            }
            
            const life = 1 - (age / particle.maxLife);
            
            if (this.mode === 'spray') {
                particle.x += particle.velocityX;
                particle.y += particle.velocityY;
                particle.velocityY += 0.05;
                particle.element.style.left = `${particle.x}px`;
                particle.element.style.top = `${particle.y}px`;
                particle.element.style.opacity = life;
            } else if (this.mode === 'ripple') {
                const size = (1 - life) * 50;
                particle.element.style.width = `${size}px`;
                particle.element.style.height = `${size}px`;
                particle.element.style.opacity = life * 0.8;
                particle.element.style.borderWidth = `${1.5 * life}px`;
            } else if (this.mode === 'trail') {
                particle.element.style.opacity = life * 0.8;
            }
            
            return true;
        });
        
        requestAnimationFrame(() => this.updateParticles());
    }

    updateCursorPosition() {
        this.cursor.style.left = `${this.lastX}px`;
        this.cursor.style.top = `${this.lastY}px`;
        requestAnimationFrame(() => this.updateCursorPosition());
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const timestamp = Date.now();
            this.lastX = e.clientX;
            this.lastY = e.clientY;

            if (this.mode === 'trail') {
                this.updateCursorTrail(e.clientX, e.clientY, timestamp);
            } else if (this.mode === 'spray' && Math.random() > 0.7) {
                this.particles.push(this.createSparkParticle(e.clientX, e.clientY));
            } else if (this.mode === 'ripple' && Math.random() > 0.8) {
                this.particles.push(this.createRippleParticle(e.clientX, e.clientY));
            }
            
            this.currentX = e.clientX;
            this.currentY = e.clientY;
        });

        document.addEventListener('mousedown', () => this.cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('clicking'));

        this.updateParticles();
        this.updateCursorPosition();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
}); 