// DOM Elements
const box = document.getElementById('box');
const animateBtn = document.getElementById('animateBtn');
const themeBtn = document.getElementById('themeBtn');
const colorPicker = document.getElementById('colorPicker');
const lastVisitedSpan = document.getElementById('lastVisited');

// Animation State
let currentAnimation = null;
const animations = ['spin', 'pulse', null];
let animationIndex = 0;

// Toggle Animations
function toggleAnimation() {
    if (currentAnimation) {
        box.classList.remove(currentAnimation);
    }

    animationIndex = (animationIndex + 1) % animations.length;
    currentAnimation = animations[animationIndex];

    if (currentAnimation) {
        box.classList.add(currentAnimation);
    }
}

// Theme Management
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Color Picker
colorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
    localStorage.setItem('primaryColor', e.target.value);
});

// Save/Load Preferences
function loadPreferences() {
    // Load theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');

    // Load color
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        colorPicker.value = savedColor;
    }

    // Save visit time
    const lastVisit = new Date().toLocaleString();
    localStorage.setItem('lastVisited', lastVisit);
    lastVisitedSpan.textContent = lastVisit;
}

// Event Listeners
animateBtn.addEventListener('click', toggleAnimation);
themeBtn.addEventListener('click', toggleTheme);

// Initialize
document.addEventListener('DOMContentLoaded', loadPreferences);