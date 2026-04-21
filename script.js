// Petal Fall Animation
function createPetal() {
    const petalsContainer = document.getElementById('petals-container');
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Randomize properties
    const size = Math.random() * 15 + 10; // 10px to 25px
    const left = Math.random() * 100; // 0 to 100vw
    const duration = Math.random() * 5 + 5; // 5s to 10s
    const rotation = Math.random() * 360;
    const colorChance = Math.random();
    
    // Some maroon petals, some gold, mostly light pink
    if (colorChance > 0.8) {
        petal.style.background = 'linear-gradient(135deg, #dfb160, #fbe6a2)';
    } else if (colorChance > 0.6) {
        petal.style.background = 'linear-gradient(135deg, #800000, #4a0404)';
    }
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}vw`;
    petal.style.top = `-30px`;
    petal.style.transform = `rotate(${rotation}deg)`;
    petal.style.animationDuration = `${duration}s`;
    
    petalsContainer.appendChild(petal);
    
    // Remove after animation completes
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

// Defer petals until doors open
let petalInterval;
function startPetals() {
    petalInterval = setInterval(createPetal, 300);
    for(let i=0; i<10; i++) setTimeout(createPetal, Math.random()*2000);
}

// Door Logic
document.getElementById('open-door-btn').addEventListener('click', function() {
    const overlay = document.getElementById('door-overlay');
    const wrapper = document.querySelector('.wrapper');
    
    // Play Audio immediately on user interaction
    audio.play().catch(e => console.log("Audio play failed:", e));
    isPlaying = true;
    audioIcon.className = 'fas fa-volume-up';

    // Trigger door opening and zoom effect
    overlay.classList.add('door-open');
    wrapper.classList.add('entered');

    // Remove overlay and start petals when doors finish opening
    setTimeout(() => {
        overlay.style.display = 'none';
        startPetals();
    }, 1500);
});

// Audio Control
const audio = document.getElementById('bg-music');
const audioBtn = document.getElementById('audio-toggle');
const audioIcon = audioBtn.querySelector('i');
let isPlaying = false;

audioBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        audioIcon.className = 'fas fa-volume-mute';
    } else {
        audio.play().catch(e => console.log("Audio play failed:", e));
        audioIcon.className = 'fas fa-volume-up';
    }
    isPlaying = !isPlaying;
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

// Countdown Timer
// Set date to a future date
const countDownDate = new Date("May 7, 2026 22:31:00").getTime();

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "<h3>The Ceremony Has Begun!</h3>";
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("mins").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("secs").innerText = seconds.toString().padStart(2, '0');
}, 1000);

// Removed gallery slider because it's replaced with a static quote

// Share Modal Logic
const shareBtn = document.getElementById('share-btn');
const shareModal = document.getElementById('share-modal');
const closeModal = document.querySelector('.close-modal');

shareBtn.addEventListener('click', () => {
    shareModal.style.display = "block";
});

closeModal.addEventListener('click', () => {
    shareModal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target == shareModal) {
        shareModal.style.display = "none";
    }
});

// Configure Custom Share Links
const pageUrl = encodeURIComponent(window.location.href);
const shareMessage = encodeURIComponent("We warmly invite you to Bondada's House Ceremony. Please join us to bless our new home!\n\n— Created via Manainvite\n\n");

document.getElementById('share-wa').href = `https://wa.me/?text=${shareMessage}${pageUrl}`;
document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

document.getElementById('share-copy').addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
    });
});
