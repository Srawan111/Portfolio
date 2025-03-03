document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carousel').forEach((carousel) => {
        const carouselContainer = carousel.querySelector('.carousel-container');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const counter = carousel.querySelector('.counter');
        const fullscreenToggle = carousel.querySelector(".fullscreen-btn");
        const items = carousel.querySelectorAll('.carousel-item');

        let isFullscreen = false;
        let currentIndex = 0;
        const totalItems = items.length;
        let hideTimeout, mouseMoveTimeout;
        let isUIVisible = false;


    // Update counter display
    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${totalItems}`;
        const currentItem = items[currentIndex];
        // Hide fullscreen button if current item is an iframe
        const hasIframe = currentItem.querySelector("iframe") !== null;

        // Hide fullscreen button if the current item is an iframe
        fullscreenToggle.style.display = hasIframe ? 'none' : 'block';
        console.log(" has frame " + hasIframe);
    }

    // Show next item with loop
    function showNext() {
        resetIframes();
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Show previous item with loop
    function showPrev() {
        resetIframes();
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    function resetIframes() {
        carousel.querySelectorAll('.carousel-item iframe').forEach(iframe => {
            iframe.src = iframe.src;// Refresh the iframe to stop playing
        });
    }

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateCounter();
    }


    // 🖥️ Full-Screen Toggle
    fullscreenToggle.addEventListener("click", () => {
            isFullscreen ? exitFullScreen() : enterFullScreen();
        });

        function enterFullScreen() {
            carousel.classList.add("fullscreen");
            fullscreenToggle.innerHTML = `<svg width="30" height="30" viewBox="4 4 28 28" fill="white">
                <g><path d="M14,14H10v2h6v-6h-2v4Z"></path></g>
                <g><path d="M22,14V10h-2v6h6v-2h-4Z"></path></g>
                <g><path d="M20,26h2V22h4v-2h-6v6Z"></path></g>
                <g><path d="M10,22h4v4h2v-6h-6v2Z"></path></g>
            </svg>`;
            isFullscreen = true;
        }

        function exitFullScreen() {
            carousel.classList.remove("fullscreen");
            fullscreenToggle.textContent = "⛶";
            isFullscreen = false;
        }

    // Function to show UI
    function showUI() {
        setActiveUI(true);
        clearTimeout(hideTimeout);
        resetMouseMovementTimer();
    }

    // Function to hide UI after inactivity
    function hideUI() {
        hideTimeout = setTimeout(() => setActiveUI(false), 100);
    }

  
    function setActiveUI(isVisible) {
        isUIVisible = isVisible;
        const displayState = isVisible ? "inherit" : "none";
        nextBtn.style.display = displayState;
        prevBtn.style.display = displayState;
        counter.style.display = displayState;
        const currentItem = items[currentIndex];
        const hasIframe = currentItem.querySelector("iframe") !== null;
        fullscreenToggle.style.display = hasIframe ? "none" : displayState; // Only show if no iframe
    }
    // Reset idle timer when mouse moves
    function resetMouseMovementTimer() {
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => setActiveUI(false), 2000);
    }

    // Attach event listeners **only inside** carouselContainer
    carousel.addEventListener("mouseover", showUI);
    carousel.addEventListener("mousemove", showUI);
    carousel.addEventListener("mouseout", hideUI);

    // Touch events for mobile
    carousel.addEventListener("touchstart", showUI);
    carousel.addEventListener("touchmove", showUI);
    carousel.addEventListener("touchend", hideUI);

    // Prevent scrolling inside the div while touching
     carousel.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

    // 🎮 Keyboard Controls
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") showNext();
        else if (event.key === "ArrowLeft") showPrev();
        else if (event.key === "Escape" && isFullscreen) exitFullScreen();
    });

    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    updateCounter();
});
});
