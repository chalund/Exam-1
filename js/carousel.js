import {fetchAllProducts } from "./constants.js";

  const carouselContainer = document.querySelector('.carousel-container');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const dotIndicator = document.querySelector('.dot-indicator');
  const dotElements = [];
  let currentIndex = 0;

  // // Render carousel 
  async function renderCarousel() {
    const images = await fetchAllProducts();
  
  function showImages(images, startIndex) {
    carouselContainer.innerHTML = '';
  
    for (let i = startIndex; i < startIndex + 3; i++) {
      const index = i % images.length;
      const image = document.createElement('img');
      const link = document.createElement("a");
      link.href = "blogPosts.html?id=${images[index].id}"
      image.src = images[index].better_featured_image.source_url;
      image.alt = images[index].better_featured_image.altText;
      image.classList.add('carousel-image');
      link.append(image)
      carouselContainer.append(link);
    }
  }
  
  function createDot(index) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', function () {
      currentIndex = index;
      showImages(images, currentIndex * 3);
      updateActiveDot();
    });
    dotIndicator.append(dot);
    dotElements.push(dot);
  }
  
  function updateActiveDot() {
    dotElements.forEach(function (dot, index) {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function updateButtonState() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= Math.floor(images.length / 3) - 1;
  }
  
 // Create dots based on the number of pages (maximum 3 dots)
const totalPages = Math.min(Math.ceil(images.length / 3), 3);
for (let i = 0; i < totalPages; i++) {
  createDot(i);
}
  
    showImages(images, currentIndex * 3) ;
    updateActiveDot();
    updateButtonState();
  
    prevButton.addEventListener('click', function () {
      if (prevButton.disabled) return;
      currentIndex = (currentIndex - 1 + totalPages) % totalPages;
      showImages(images, currentIndex);
      updateActiveDot();
      updateButtonState();
    });
  
    nextButton.addEventListener('click', function () {
      if (nextButton.disabled) return;
      currentIndex = (currentIndex + 1) % totalPages;
      showImages(images, currentIndex * 3);
      updateActiveDot();
      updateButtonState();
    });
  }

  
renderCarousel();