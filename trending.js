document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');
    let currentIndex = 0;

    // Style the buttons
    nextButton.innerHTML = '➡️';
    prevButton.innerHTML = '⬅️';
    nextButton.classList.add('carousel-button');
    prevButton.classList.add('carousel-button');

    // Append buttons to the carousel
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    // Function to update the carousel
    function updateCarousel() {
        items.forEach((item, index) => {
            // Set transform to move items horizontally
            item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }

    // Next button functionality
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length; // Cycle to the next item
        updateCarousel();
    });

    // Previous button functionality
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length; // Cycle to the previous item
        updateCarousel();
    });

    // Initialize carousel position
    updateCarousel();

    // Optional: Auto-slide feature (if desired)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % items.length;
    //     updateCarousel();
    // }, 5000); // Change slides every 5 seconds
});
