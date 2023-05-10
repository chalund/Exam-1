const urlBase = "https://wordpress-exam.charlottelund.no";
const blogPost = "/wp-json/wp/v2/posts";
const posts = "/wp-json/wp/v2/posts?_embed"



//fetching products
async function getAllPosts(){
    const response = await fetch(urlBase + blogPost);
    const products =  await response.json();
    return products;
}

//fetch single product
async function getSinglePost(id){
    const response = await fetch(urlBase + blogPost + `/${id}`);
    const products = await response.json();
    return products;
}


//create html
function createProductHTML(product){
    const container = document.querySelector(".container_blog-posts");

    // const productContainer = document.createElement("a")
    // productContainer.href = `/blogPage.html?id=${id}`;


    const productContainer= document.createElement("div");
    productContainer.classList.add("posts")
    productContainer.id = product.id

    

    const title = document.createElement("h2");
    title.innerText = product.title.rendered;
    productContainer.append(title)

    const id = document.createElement("h3")
    id.innerText = product.id;
    productContainer.append(id)

    const content = document.createElement("p");
    productContainer.classList.add("product-text");
    content.innerText = product.excerpt.rendered
    productContainer.append(content)


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
    console.log(products[0]);
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












