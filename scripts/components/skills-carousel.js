// change skills later
class SkillsCarousel {
    constructor() {
        this.skillSets = {
            frontend: [
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            ],
            backend: [
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            ],
            tools: [
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
                { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' }
            ]
        };

        this.minItemsPerTrack = 15; 
        this.init();
        this.setupMouseEffects();
    }

    setupTrack(trackId, skills) {
        const track = document.getElementById(trackId);
        if (!track) {
            console.error(`Track ${trackId} not found`);
            return;
        }

        track.innerHTML = '';

        const repeatCount = Math.ceil(this.minItemsPerTrack / skills.length);
        const extendedSkills = Array(repeatCount).fill(skills).flat();
        
        const skillSet = [...extendedSkills, ...extendedSkills];
        
        skillSet.forEach(skill => {
            const skillElement = this.createSkillElement(skill);
            track.appendChild(skillElement);
        });

        const direction = track.dataset.direction;
        const duration = 40; 
        
        track.addEventListener('animationend', () => {
            track.style.animation = 'none';
            track.offsetHeight; 
            track.style.animation = `scroll${direction === 'left' ? 'Left' : 'Right'} ${duration}s linear infinite`;
        });

        track.style.animation = `scroll${direction === 'left' ? 'Left' : 'Right'} ${duration}s linear infinite`;
    }

    createSkillElement(skill) {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" title="${skill.name}">`;
        
        console.log(`Created skill element for ${skill.name}`);
        return div;
    }

    setupMouseEffects() {
        const tracks = document.querySelectorAll('.carousel-track');
        
        tracks.forEach(track => {
            track.addEventListener('mousemove', (e) => {
                const items = track.querySelectorAll('.skill-item');
                const trackRect = track.getBoundingClientRect();
                const mouseX = e.clientX - trackRect.left;

                items.forEach(item => {
                    const itemRect = item.getBoundingClientRect();
                    const itemCenter = itemRect.left + itemRect.width / 2 - trackRect.left;
                    const distance = Math.abs(mouseX - itemCenter);
                    const maxDistance = 150; 
                    
                    if (distance < maxDistance) {
                        const scale = 1 + (1 - distance / maxDistance) * 0.5; 
                        item.style.transform = `scale(${scale})`;
                        item.style.zIndex = Math.floor(scale * 100);
                    } else {
                        item.style.transform = 'scale(1)';
                        item.style.zIndex = 1;
                    }
                });
            });

            track.addEventListener('mouseleave', () => {
                const items = track.querySelectorAll('.skill-item');
                items.forEach(item => {
                    item.style.transform = 'scale(1)';
                    item.style.zIndex = 1;
                });
            });
        });
    }

    init() {
        console.log('Initializing SkillsCarousel');
        this.setupTrack('track1', this.skillSets.frontend);
        this.setupTrack('track2', this.skillSets.backend);
        this.setupTrack('track3', this.skillSets.tools);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating SkillsCarousel');
    new SkillsCarousel();
}); 