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
        
        particle.style.width = '50px';
        particle.style.height = '1px';
        particle.style.transform = `rotate(${angle}deg)`;
        particle.style.opacity = '0.7';
        
        document.body.appendChild(particle);
        return {
            element: particle,
            createdAt: Date.now(),
            x, y,
            angle,
            maxLife: 300
        };
    }

    createSparkParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'spray-particle';
        
        const size = Math.random() * 2 + 1; 
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1; 
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        document.body.appendChild(particle);
        return {
            element: particle,
            createdAt: Date.now(),
            x, y,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed - 1 
        };
    }

    createRippleParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'ripple-particle';
        
        document.body.appendChild(particle);
        
        return {
            element: particle,
            createdAt: Date.now(),
            x, y,
            size: 0,
            maxSize: Math.random() * 40 + 20
        };
    }

    updateParticles() {
        const now = Date.now();
        
        this.particles.forEach((particle, index) => {
            const age = now - particle.createdAt;
            const life = 1 - (age / this.particleLifespan);
            
            if (life <= 0) {
                particle.element.remove();
                this.particles.splice(index, 1);
                return;
            }

            switch(this.mode) {
                case 'spray':
                    particle.velocityY += 0.2; 
                    particle.x += particle.velocityX;
                    particle.y += particle.velocityY;
                    break;
                case 'ripple':
                    particle.size = particle.maxSize * (1 - life);
                    particle.element.style.width = `${particle.size}px`;
                    particle.element.style.height = `${particle.size}px`;
                    particle.element.style.borderWidth = `${2 * life}px`;
                    break;
            }
            
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
            particle.element.style.opacity = life;
        });
        
        requestAnimationFrame(() => this.updateParticles());
    }

    updateCursorPosition() {
        this.currentX += (this.lastX - this.currentX) * this.speed;
        this.currentY += (this.lastY - this.currentY) * this.speed;
        
        this.cursor.style.left = `${this.currentX}px`;
        this.cursor.style.top = `${this.currentY}px`;
        
        requestAnimationFrame(() => this.updateCursorPosition());
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            
            if (this.mode === 'trail') {
                const angle = Math.atan2(e.clientY - this.currentY, e.clientX - this.currentX) * 180 / Math.PI;
                this.particles.push(this.createParticle(this.currentX, this.currentY, angle));
            } else if (Math.random() > 0.8) { 
                this.particles.push(this.createParticle(this.currentX, this.currentY));
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