document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    console.log('Found cards:', cards.length);
    
    cards.forEach(card => {
        card.style.transform = 'none';
        card.style.transition = 'none';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.willChange = 'transform';
            card.style.transformOrigin = 'center center';
            card.style.transform = `
                perspective(1000px) 
                translateZ(0)
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.willChange = 'auto';
            card.style.transform = 'none';
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = Array.from(cards).indexOf(card);
                card.style.animation = `cardAppear 1s ease-out ${index * 0.2}s forwards`;
            } else {
                entry.target.style.animation = 'none';
                entry.target.style.opacity = '0';
                entry.target.style.translate = '0 100px';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        projectObserver.observe(card);
    });

    const githubLinks = document.querySelectorAll('.github-link');
    githubLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });

    const projectCards = document.querySelectorAll('a.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = card.href; 
        });
    });
});