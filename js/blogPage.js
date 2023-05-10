const urlBase = "https://wordpress-exam.charlottelund.no";
const jsonBase = "/wp-json/wp/v2";
const postEndpoint = "/posts";

const fullPostURL = urlBase + jsonBase + postEndpoint + "?_embed";




//fetching products
async function getAllPosts(){
    const response = await fetch(fullPostURL);
    const products =  await response.json();
    return products;
}


async function getSinglePost(id){
    const response = await fetch(fullPostURL + `/${id}`);
    const products = await response.json();
    return products;
}

function createProductHTML(product){
    const container = document.querySelector(".container_blog-posts");


    // const excerpt = decodeHTML(product.excerpt.rendered.replace("<p>", "").replace("</p>", ""));
    // const exampleHTMLText = "<p>sample text</p>"
    // const text = exampleHTMLText.replace('<p>', '').replace('</p>', '');

    


    const productContainer= document.createElement("a");
    productContainer.href = `/blogPage.html?id=` + product.id;
    productContainer.classList.add("posts")
    productContainer.id = product.id

    //temporary just to illustrate place of image
    // const id = document.createElement("h4")
    // id.innerText = product.id;
    // productContainer.append(id)
 
    
  


    // const image = document.createElement("img");
    // productContainer.classList.add("post-img");
    // image.innerHTML = product._embedded["wp:featuredmedia"][0].source_url;

    // productContainer.append(image)


    
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-content")
    productContainer.append(postContainer)


    const title = document.createElement("h2");
    title.innerText = product.title.rendered;
    postContainer.append(title)



    const content = document.createElement("p");
    content.innerText = product.excerpt.rendered;
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
// function renderSInglePost(post) {
//     const postsContainer = document.querySelector(".blog-posts");

//     const wrapper = document.createElement("a");
//     wrapper.classList.add("post");
//     wrapper.href = "/blogPage.html?id=${id}";

//     const postList = document.createElement("div");
//     postList.classList.add("post");
//     postList.id = post.id

//     postsContainer.append(postsContainer)


// }












