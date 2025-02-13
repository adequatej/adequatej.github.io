document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const skipButton = document.getElementById('skip-button');
    const sections = document.querySelectorAll('section:not(#hero)');
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.querySelector('.theme-toggle');

    body.classList.add('initial-load');

    const showContent = () => {
        body.classList.remove('initial-load');
        sections.forEach(section => {
            section.style.transition = 'opacity 0.5s ease-out';
            section.style.opacity = '1';
        });
        navbar.classList.add('visible');
    };

    skipButton.addEventListener('click', () => {
        showContent();
        const nextSection = document.querySelector('#about');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    const handleScroll = () => {
        const heroSection = document.querySelector('#hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY > heroBottom - window.innerHeight / 2) {
            showContent();
            window.removeEventListener('scroll', handleScroll);
        }
    };

    window.addEventListener('scroll', handleScroll);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            skipButton.click();
        }
    });
}); 