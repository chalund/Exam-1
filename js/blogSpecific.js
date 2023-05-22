import { fetchSingleProducts } from "./constants.js";

const pageWrapper = document.querySelector(".blog-page")
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const blogPage = document.querySelector(".specific");


//create html on blog specific page
async function renderPost() {
   
    const post = await fetchSingleProducts(id);
    console.log(post)

    const wrapper = document.createElement("div");
    wrapper.classList.add("blog-specific")
    blogPage.append(wrapper)

    const title = document.createElement("h2")
    title.innerText = post.title.rendered;
    wrapper.append(title)

    const image = document.createElement("img");
    image.src = post.better_featured_image.source_url;
    image.alt = post.better_featured_image.alt_text;
    image.classList.add("blog-specific-image");
    wrapper.append(image)

    const body = document.createElement("p");
    body.innerText = post.excerpt.rendered;
    body.classList.add("post-content")
    body.innerText = post.excerpt.rendered.replace('<p>', '').replace('</p>', '');
    wrapper.append(body)

    
    image.addEventListener("click", function () {
        showModal(post.better_featured_image.source_url);
      });

    blogPage.append(wrapper)
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


