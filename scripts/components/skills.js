// Skills Animation
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once faded in
            }
        });
    }, { threshold: 0.1 });

    skillsObserver.observe(skillsSection);
});

