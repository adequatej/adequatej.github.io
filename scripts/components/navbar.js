const navbar = document.querySelector('#navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

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
    const navButtons = document.querySelectorAll('.nav-buttons-container label');
    
    navButtons.forEach(label => {
        label.addEventListener('click', (e) => {
            const input = label.querySelector('input');
            const sectionId = input.id;
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: `-${document.querySelector('.navbar').offsetHeight}px 0px 0px 0px`
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const radioButton = document.querySelector(`input[type="radio"]#${sectionId}`);
                if (radioButton) {
                    radioButton.checked = true;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });

    const themeButtons = document.querySelectorAll('.theme-toggle-container input[type="radio"]');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
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