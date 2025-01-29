document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const getThreshold = () => {
        if (window.innerWidth < 768) {
            return 0.4;
        }
        return 0.75;
    };

    const options = {
        threshold: getThreshold(), 
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Update threshold on window resize
    window.addEventListener('resize', () => {
        observer.disconnect();
        const newOptions = {
            threshold: getThreshold(),
            rootMargin: "0px"
        };
        const newObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, newOptions);
        
        sections.forEach(section => {
            newObserver.observe(section);
        });
    });
});