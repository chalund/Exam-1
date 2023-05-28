import { fetchSingleProducts, formatDate } from "./constants.js";

const pageWrapper = document.querySelector(".blog-page")
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const blogPage = document.querySelector(".specific");


//clean content
function cleanedString(htmlString) {
    return htmlString
      .replace(/<\/?p>/g, "")
      .replace(/<.*?>/g, "")
      .replace(/<\/p>\s*<p>/g, "");

  }

//fetch images from content
function fetchImagesFromContent(imageContent) {
    const imageRegex = /<img.*?src="(.*?)".*?>/g;
    const images = [];
    let match;
  
    while ((match = imageRegex.exec(imageContent))) {
      const imageUrl = match[1];
      images.push(imageUrl);
    }
  
    return images;
  }
  

//create html on blog specific page
async function renderPost() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    const post = await fetchSingleProducts(id);
 
    const wrapper = document.createElement("div");
    wrapper.classList.add("blog-specific")
    blogPage.append(wrapper)

    const title = document.createElement("h1")
    title.innerText = post.title.rendered;
    title.classList.add("blog-title")
    wrapper.append(title)

    const image = document.createElement("img");
    image.src = post.better_featured_image.source_url;
    image.alt = post.better_featured_image.alt_text;
    image.classList.add("blog-specific-image");
    wrapper.append(image)

    image.addEventListener("click", function () {
        showModal(post.better_featured_image.source_url);
       
      });

    const date = document.createElement("p");
    date.innerText = "Published:" + " " + formatDate(post.date);
    date.classList.add("date")
    wrapper.append(date)

    const content = post.content.rendered;
    const cleanedContent = cleanedString(content); 
    const paragraph1 = document.createElement("p");
    paragraph1.classList.add("paragraph-one");
    paragraph1.textContent = cleanedContent;
    wrapper.append(paragraph1);

    const containerWrapper = document.createElement("div");
    containerWrapper.classList.add("specific-section")
    wrapper.append(containerWrapper);     

    const excerpt = post.excerpt.rendered;
    const cleanedExcerpt = cleanedString(excerpt);   
    const paragraph2 = document.createElement("p");
    paragraph2.innerText = cleanedExcerpt;
    containerWrapper.append(paragraph2);
 
    const imageContent = post.content.rendered;
    const images = fetchImagesFromContent(imageContent);

      if (images.length > 0) {
        const imageUrl = images[0];
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.classList.add("section-two-image")
        containerWrapper.append(imgElement);

        imgElement.addEventListener("click", function () {
            showModal(imageUrl);
           
          });
      }
      
    blogPage.append(wrapper)
    loader.style.display = "none";
    return blogPage;
}
renderPost()


//create modal for image
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

// Function to show the modal with the clicked image
function showModal(imageUrl) {
    modalImage.src = imageUrl;
    modal.style.display = "block";
  }
  
  // Function to hide the modal
  function hideModal() {
    modal.style.display = "none";
  }
  
  // Add click event listener to close modal button
  closeModal.addEventListener("click", hideModal);
  
  // Add click event listener to modal content to hide modal when clicked outside the image
  modalContent.addEventListener("click", function (event) {
    if (event.target === modalContent) {
      hideModal();
    }
});