document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const options = {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            const section = entry.target;
            const container = section.querySelector('.about-container, .skills-container, .projects-container, .contact-container');
            
            if (entry.isIntersecting && container) {
                section.classList.add('active');
                container.style.display = 'flex';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }
        });
    }, options);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            sections.forEach(section => {
                const container = section.querySelector('.about-container, .skills-container, .projects-container, .contact-container');
                if (container) {
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                    container.style.display = 'flex';
                }
            });
        }, 250); 
    });

    sections.forEach(section => {
        if (section.id !== 'hero' && !section.classList.contains('navbar')) {
            observer.observe(section);
            const container = section.querySelector('.about-container, .skills-container, .projects-container, .contact-container');
            if (container) {
                container.style.display = 'flex';
            }
        }
    });
});