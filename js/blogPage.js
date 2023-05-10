
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
    const products = await response.json();
    return products;
}



//create html
function createProductHTML(product){
    const container = document.querySelector(".container_blog-posts");

    const productContainer= document.createElement("a");
    productContainer.href = `/blogPage.html?id=` + product.id;
    productContainer.classList.add("posts")
    productContainer.id = product.id
    

    //temporary just to illustrate place of image
    // const id = document.createElement("h4")
    // id.innerText = product.id;
    // productContainer.append(id)
 
    
  


    const image = document.createElement("img");
  
    image.src = product._embedded["wp:featuredmedia"][0].source_url;
    image.alt = product._embedded["wp:featuredmedia"][0].alt_text;

    image.classList.add("post-img");
    
    productContainer.append(image)


    
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-content")
    productContainer.append(postContainer)


    const title = document.createElement("h2");
    title.innerText = product.title.rendered;
    postContainer.append(title)



    const content = document.createElement("p");
    content.innerText = product.excerpt.rendered.replace('<p>', '').replace('</p>', '');
    postContainer.append(content)


    container.append(productContainer)

}

function createProductsHTML(products) {
    for( let i = 0; i < products.length; i++){
        const product = products[i];
        createProductHTML(product)
    }
}




async function main(){
    const products = await getAllPosts()
    console.log(products);
    createProductsHTML(products)
}

main()
