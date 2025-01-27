// active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if the section is in view
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id'); 
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active'); 
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active'); 
        }
    });
});