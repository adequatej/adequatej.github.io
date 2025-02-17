// Sticky Navigation
const navbar = document.querySelector('#navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove background color based on scroll position
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // // Hide/show navbar based on scroll direction
    // if (currentScroll > lastScroll && currentScroll > 500) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// function to handle the Sprial glow animation 
const triggerGlowAnimation = () => {
    console.log('Animation triggered');
    console.log('Before removal:', themeToggle.classList.contains('active'));
    
    themeToggle.classList.remove('active');
    
    void themeToggle.offsetWidth;
    
    themeToggle.classList.add('active');
    console.log('After adding:', themeToggle.classList.contains('active'));
    
    setTimeout(() => {
        themeToggle.classList.remove('active');
        console.log('After timeout:', themeToggle.classList.contains('active'));
    }, 1500);
};

// Function to update the theme
const updateTheme = (isDarkMode) => {
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDarkMode);
};

// // Toggle Light Mode
// const updateTheme2 = (isLightMode) => {
//     if (isLightMode) {
//         body.classList.add('light-mode');
//     } else {
//         body.classList.remove('light-mode');
//     }
//     localStorage.setItem('lightMode', isLightMode);
// }


// Handle theme toggle click
const handleToggle = (event) => {
    console.log('Button clicked');
    event.preventDefault();
    
    const isDarkMode = !body.classList.contains('dark-mode');
    updateTheme(isDarkMode);
    
    triggerGlowAnimation();
};


// const handleToggle = (event) => {
//     console.log('Toggle activated');
//     event.preventDefault();

//     const isLightMode = !
// }

console.log('Theme toggle element:', themeToggle);

themeToggle.addEventListener('click', handleToggle);

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
updateTheme(savedDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('.nav-buttons-container input');
    let isScrolling = false;

    // Smooth scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        isScrolling = true;
        section.scrollIntoView({
            behavior: 'smooth'
        });

        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);

        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // Update active section in navbar
    function updateActiveSection() {
        if (isScrolling) return;

        let currentSectionId = '';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        navButtons.forEach(button => {
            button.checked = button.id === currentSectionId;
        });
    }

    // Event listeners for navbar buttons
    navButtons.forEach(button => {
        button.addEventListener('change', (e) => {
            if (e.target.checked) {
                scrollToSection(e.target.id);
            }
        });
    });

    // Scroll event listener for updating active section
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveSection);
    });

    // Initial active section check
    updateActiveSection();

    // Handle hash links on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    }

    // Add scroll animations to sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '-20% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Theme handling
    const themeButtons = document.querySelectorAll('.theme-toggle-container input[type="radio"]');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.querySelector(`#${savedTheme}`).checked = true;
        applyTheme(savedTheme);
    } else {
        document.querySelector('#system').checked = true;
        applyTheme('system');
    }

    themeButtons.forEach(button => {
        button.addEventListener('change', () => {
            const theme = button.id;
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Update theme when system preference changes
    prefersDarkScheme.addEventListener('change', () => {
        if (document.querySelector('#system').checked) {
            applyTheme('system');
        }
    });

    function applyTheme(theme) {
        const isDark = theme === 'dark' || 
            (theme === 'system' && prefersDarkScheme.matches);

        if (isDark) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }
});

// document.querySelector('menu-bar').addEventListener('click;, () => {
//     console.log('Menu clicked');
//     });gi