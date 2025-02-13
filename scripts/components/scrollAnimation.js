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
                container.style.opacity = Math.pow(ratio, 0.5);
                container.style.transform = `translateY(${30 * (1 - ratio)}px)`;
            } else if (container) {
                section.classList.remove('active');
                container.style.opacity = 0;
                container.style.transform = 'translateY(30px)';
                container.style.display = 'flex';
            }
        });
    }, options);

    // for non-hero sections
    sections.forEach(section => {
        if (section.id !== 'hero' && !section.classList.contains('navbar')) {
            observer.observe(section);
            const container = section.querySelector('.about-container, .skills-container, .projects-container, .contact-container');
            if (container) {
                container.style.display = 'flex';
            }
        }
    });

    window.addEventListener('resize', () => {
        observer.disconnect();
        const newOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: "-5% 0px"
        };
        const newObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                const section = entry.target;
                
                if (entry.isIntersecting) {
                    section.style.opacity = Math.max(0.4 + (ratio * 0.6), 0.4);
                    section.classList.add('active');
                    
                    const translateY = 20 - (ratio * 20);
                    section.style.transform = `translateY(${translateY}px)`;
                } else {
                    section.style.opacity = 0.9;
                    section.classList.remove('active');
                }
            });
        }, newOptions);
        
        sections.forEach(section => {
            newObserver.observe(section);
        });
    });
});