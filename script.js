document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('.carousel-inner');
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  // Clone the first few slides to create a continuous effect
  for (let i = 0; i < totalSlides; i++) {
    const clone = slides[i].cloneNode(true);
    carouselInner.appendChild(clone);
  }

  let currentSlide = 0;

  function showSlide(index) {
    const slideWidth = slides[0].clientWidth + 10; // 10 for 5px margin on each side
    const offset = -index * slideWidth;
    carouselInner.style.transform = `translateX(${offset}px)`;

    // Check if we've reached the end of the cloned slides
    if (index >= totalSlides) {
      setTimeout(() => {
        carouselInner.style.transition = 'none';
        currentSlide = 0;
        carouselInner.style.transform = `translateX(0px)`;
      }, 500); // Match the transition duration
    } else {
      carouselInner.style.transition = 'transform 0.5s ease';
    }
  }

  function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
      carouselInner.style.transition = 'none';
      const slideWidth = slides[0].clientWidth + 10;
      const offset = -currentSlide * slideWidth;
      carouselInner.style.transform = `translateX(${offset}px)`;
      setTimeout(() => {
        carouselInner.style.transition = 'transform 0.5s ease';
        currentSlide = totalSlides - 1;
        showSlide(currentSlide);
      }, 0);
    } else {
      showSlide(currentSlide);
    }
  }

  // Auto slide
  setInterval(() => {
    nextSlide();
  }, 3000);

  // Toggle drawer
  const drawerToggle = document.querySelector('.drawer-toggle');
  const drawerContent = document.querySelector('.drawer-content');
  
  drawerToggle.addEventListener('click', () => {
    drawerToggle.classList.toggle('active');
    drawerContent.style.display = drawerContent.style.display === 'flex' ? 'none' : 'flex';
  });
});

// Get the popup and its elements
var popup = document.getElementById('popup');
var popupImg = document.getElementById('popup-img');
var caption = document.getElementById('caption');
var close = document.getElementsByClassName('close')[0];

// Get all product links
var productLinks = document.querySelectorAll('.product-link');

// Add click event listener to each product link
productLinks.forEach(function(link) {
    link.onclick = function(event) {
        event.preventDefault(); // Prevent the default action of the link
        var imageSrc = this.getAttribute('data-image'); // Get the image source from data attribute
        popupImg.src = imageSrc; // Set the source of the popup image
        caption.innerHTML = this.querySelector('img').alt; // Set the caption to the alt text of the thumbnail
        popup.style.display = 'block'; // Show the popup
    };
});

// When the user clicks on <span> (x), close the popup
close.onclick = function() {
    popup.style.display = 'none';
}

// Optionally, close the popup when clicking outside of the image
window.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
}
