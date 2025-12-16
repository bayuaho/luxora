const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navbar.classList.toggle('active');
    });

    // Biar kalau layar diklik di luar menu (opsional, untuk UX lebih bagus)
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && navbar.classList.contains('active')) {
            menuToggle.classList.remove('is-active');
            navbar.classList.remove('active');
        }
    });

// Filter functionality for Destination page
const filterSelect = document.getElementById('filter');
if (filterSelect) {
    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        const cards = document.querySelectorAll('.link-card');
        cards.forEach(card => {
            if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let images = [];

if (lightbox) {
    // Function to get visible images
    function getVisibleImages() {
        const visibleCards = document.querySelectorAll('.link-card[style*="display: block"], .link-card:not([style*="display"])');
        return Array.from(visibleCards).map(card => card.querySelector('img').src);
    }

    // Get all card images for initial setup
    const cardImages = document.querySelectorAll('.link-card img');
    cardImages.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            images = getVisibleImages();
            const allImages = Array.from(cardImages).map(img => img.src);
            currentIndex = allImages.indexOf(img.src);
            // Adjust index if not in visible images
            if (images.indexOf(img.src) === -1) {
                currentIndex = 0; // Fallback
            } else {
                currentIndex = images.indexOf(img.src);
            }
            showImage(currentIndex);
            lightbox.style.display = 'flex';
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Navigate images
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Close on click outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    function showImage(index) {
        lightboxImg.src = images[index];
    }
}