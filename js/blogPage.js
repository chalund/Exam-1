//Base url
const urlBase = "https://wordpress-exam.charlottelund.no";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

//full url
const fullPostURL = urlBase + jsonBase + postEndpoint + "?_embed";



//fetching products
async function getAllPosts(){
    const response = await fetch(fullPostURL);
    const products =  await response.json();
    return products;
}

//fetch single post
async function getSinglePost(id){
    const response = await fetch(fullPostURL + `/${id}`);
    const product = await response.json();
    return product;
}



const pageWrapper = document.querySelector(".blog-page")
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function renderPost() {
    const post = await getSinglePost(id);
    console.log(id)
  
}

renderPost()