document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.gradient-container');
    const menuLinks = document.querySelectorAll(".glass-menu-bar .menu-link");
    const categoryButtons = document.querySelectorAll(".glass-pill-btn");
    
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const intensity = 0.04; 
    const ease = 0.06; 

    // Handle Navbar Links
    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            menuLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Handle Category Buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            categoryButtons.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Track mouse coordinates for background gradient shifting
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * intensity;
        targetY = (e.clientY - window.innerHeight / 2) * intensity;
    });

    // --- Synchronized 5-Track Slideshow System ---
    const centerSlides = document.querySelectorAll('.hero-display-img');
    const leftTopSlides = document.querySelectorAll('.left-track .left-top .side-display-img');
    const leftBottomSlides = document.querySelectorAll('.left-track .left-bottom .side-display-img');
    const rightTopSlides = document.querySelectorAll('.right-track .right-top .side-display-img');
    const rightBottomSlides = document.querySelectorAll('.right-track .right-bottom .side-display-img');
    
    let currentCenterIndex = 0;
    let currentLeftTopIndex = 0;
    let currentLeftBottomIndex = 0;
    let currentRightTopIndex = 0;
    let currentRightBottomIndex = 0;
    
    const slideInterval = 4000; 

    // Non-repeating random picker
    function getRandomIndex(currentIndex, maxElements) {
        if (maxElements <= 1) return 0;
        let newIndex = currentIndex;
        while (newIndex === currentIndex) {
            newIndex = Math.floor(Math.random() * maxElements);
        }
        return newIndex;
    }

    function runGlobalSlideshow() {
        // 1. Center Track Loop
        if (centerSlides.length > 1) {
            centerSlides[currentCenterIndex].classList.remove('active');
            currentCenterIndex = (currentCenterIndex + 1) % centerSlides.length;
            centerSlides[currentCenterIndex].classList.add('active');
        }

        // 2. Left-Top Tile Track Loop
        if (leftTopSlides.length > 1) {
            leftTopSlides[currentLeftTopIndex].classList.remove('active');
            currentLeftTopIndex = getRandomIndex(currentLeftTopIndex, leftTopSlides.length);
            leftTopSlides[currentLeftTopIndex].classList.add('active');
        }

        // 3. Left-Bottom Tile Track Loop
        if (leftBottomSlides.length > 1) {
            leftBottomSlides[currentLeftBottomIndex].classList.remove('active');
            currentLeftBottomIndex = getRandomIndex(currentLeftBottomIndex, leftBottomSlides.length);
            leftBottomSlides[currentLeftBottomIndex].classList.add('active');
        }

        // 4. Right-Top Tile Track Loop
        if (rightTopSlides.length > 1) {
            rightTopSlides[currentRightTopIndex].classList.remove('active');
            currentRightTopIndex = getRandomIndex(currentRightTopIndex, rightTopSlides.length);
            rightTopSlides[currentRightTopIndex].classList.add('active');
        }

        // 5. Right-Bottom Tile Track Loop
        if (rightBottomSlides.length > 1) {
            rightBottomSlides[currentRightBottomIndex].classList.remove('active');
            currentRightBottomIndex = getRandomIndex(currentRightBottomIndex, rightBottomSlides.length);
            rightBottomSlides[currentRightBottomIndex].classList.add('active');
        }
    }

    // Initialize 5-track slide engine loop
    setInterval(runGlobalSlideshow, slideInterval);

    // Animate Fluid Gradients
    function updateMotion() {
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        if (container) {
            container.style.setProperty('--mx', `${currentX}px`);
            container.style.setProperty('--my', `${currentY}px`);
        }
        requestAnimationFrame(updateMotion);
    }
    
    updateMotion();

    // --- Showcase Section Interactive Handling ---
    const woodVariants = document.querySelectorAll('.wood-variants .variant-dot');
    
    woodVariants.forEach(dot => {
        dot.addEventListener('click', function() {
            woodVariants.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const selectedWood = this.getAttribute('title');
            console.log(`Switching variant highlight showcase to: ${selectedWood}`);
        });
    });

    // Collection Track & Product Feature Mock Arrow Click Animations
    const showcaseArrows = document.querySelectorAll('.arrow-btn');
    showcaseArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            this.style.transform = 'scale(0.9) translateY(-2px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // --- NEW PRODUCT RANGE CAROUSEL ENGINE ---
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.range-prev');
    const nextBtn = document.querySelector('.range-next');
    
    if (track && prevBtn && nextBtn) {
        let scrollPosition = 0;
        
        function getScrollAmount() {
            const item = document.querySelector('.carousel-item');
            if (!item) return 300;
            // Return item width + the gap spacing
            return item.getBoundingClientRect().width + 300; 
        }

        nextBtn.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
            const amount = getScrollAmount();
            
            if (scrollPosition + amount >= maxScroll) {
                scrollPosition = maxScroll; // Pin at extreme end
            } else {
                scrollPosition += amount;
            }
            track.style.transform = `translateX(-${scrollPosition}px)`;
        });

        prevBtn.addEventListener('click', () => {
            const amount = getScrollAmount();
            
            if (scrollPosition - amount <= 0) {
                scrollPosition = 0; // Return clean to start position
            } else {
                scrollPosition -= amount;
            }
            track.style.transform = `translateX(-${scrollPosition}px)`;
        });

        // Re-adjust tracking position safely if browser viewport resizes dynamically
        window.addEventListener('resize', () => {
            scrollPosition = 0;
            track.style.transform = `translateX(0px)`;
        });
    }
});

// --- SCROLL INTERSECTION OBSERVER FOR BALANCED HIGHLIGHT ENGINE ---
    const observedSections = document.querySelectorAll('#about, #contact');
    const navItems = document.querySelectorAll('.glass-menu-bar .menu-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Evaluates items while passing through the mid-screen focus slot
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    observedSections.forEach(sec => {
        if (sec) sectionObserver.observe(sec);
    });