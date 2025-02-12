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


// document.querySelector('menu-bar').addEventListener('click;, () => {
//     console.log('Menu clicked');
//     });gi
