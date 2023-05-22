//base url
const urlBase = "https://wordpress-exam.charlottelund.no";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

//full url
const fullPostURL = urlBase + jsonBase + postEndpoint;

//fetch api
async function fetchAllProducts() {
    const response = await fetch (fullPostURL);
    const result = await response.json();
    return result
}

//fetch single api
async function fetchSingleProducts(id) {
    const response = await fetch (fullPostURL + `/${id}`)
    const result = await response.json();
    return result
}

//create html
function renderSingleProductHTML(product) {

    const wrapper = document.createElement("a");
    wrapper.href = `blog-specific.html?id=${product.id}`;
    wrapper.classList.add("posts")

    const image = document.createElement("img");
    image.src = product.better_featured_image.source_url;
    image.alt = product.better_featured_image.alt_text;
    image.classList.add("post-img");

    const detailsWrapper = document.createElement("div")
    detailsWrapper.classList.add("post-content")

    const heading = document.createElement("h2");
    heading.innerText = product.title.rendered;
    heading.classList.add("post-content")
    detailsWrapper.append(heading)

    const body = document.createElement("p");
    body.innerText = product.excerpt.rendered;
    body.classList.add("post-content")
    body.innerText = product.excerpt.rendered.replace('<p>', '').replace('</p>', '');
    detailsWrapper.append(body)
 
    wrapper.append(image ,detailsWrapper)
    return wrapper;
}




export {
    fullPostURL,
    fetchAllProducts,
    fetchSingleProducts,
    renderSingleProductHTML,
}