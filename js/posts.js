const $postsHolder = document.getElementById('postsHolder');
let postType = "all";
let allpostTypes = ['artist', 'album', 'venue', 'article'];
let items;
// const defaultButton = document.getElementById("");

window.addEventListener("load", (event) => {
    if(localStorage.getItem("postType")){
        postType = localStorage.getItem("postType");
    }
    if(localStorage.getItem("searchResult")){
        let searchRes = localStorage.getItem("searchResult");
        $postsHolder.innerHTML = searchRes;
    }
    //updateDefaultButton();
    updateActiveButton();
    fetchItems();
});

async function fetchItems(){
    try{
        const res = await fetch('../posts/posts.json');
        data = await res.json();
        if(res.ok) items = data;
    }
    catch (error){
        $postsHolder.innerHTML = `<h2>Unable to load Posts</h2><p>We apologize for the inconvenience. Try again later.</p>`
    }
    
    determinePostsUpdate();
}
function determinePostsUpdate(){
    if(postType == 'all'){
        updateAllPosts();
    }else{
        updatePosts();
    }
}
function updatePosts(){
    localStorage.removeItem("searchResult");
    data = items;
    let postsHolderHTML = [];
    
    data[postType].forEach(article => {
        postsHolderHTML.push(`<div class="post">
                                <img src="${article.src}">
                                <div class="infoText">
                                    <p class="img-label">${article.title}</p>
                                    <a href="#" class="category">${article.category}</a>
                                    <p class="highlight">${article.highlight}</p>
                                </div>
                                <a class="btn read-more" href="${article.path}">Read More</a>
                            </div>`);
    });
    $postsHolder.innerHTML = postsHolderHTML.join("");
}
function updateAllPosts(){
    localStorage.removeItem("searchResult");
    data = items;
    console.log(data);
    let postsHolderHTML = [];
    allpostTypes.forEach(category=>{
        console.log(category);
        data[category].forEach(article=>{
            postsHolderHTML.push(`<div class="post">
                                    <img src="${article.src}">
                                    <div class="infoText">
                                        <p class="img-label">${article.title}</p>
                                        <a href="#" class="category">${article.category}</a>
                                        <p class="highlight">${article.highlight}</p>
                                    </div>
                                    <a class="btn read-more" href="${article.path}">Read More</a>
                                </div>`);
        });
    });
    $postsHolder.innerHTML = postsHolderHTML.join("");
}
const articleSelectionButton = document.querySelectorAll('.categorySelection');

function productSelected(category){
    postType = category;
    fetchItems();
    localStorage.setItem("postType", postType);
    //updateDefaultButton();
    //updateActiveButton();
}
// function updateDefaultButton(){
//     defaultButton.textContent = postType;
// }
function updateActiveButton(){
    articleSelectionButton.forEach(button=>{
        if (button.dataset.category == postType){
            button.classList.add('active');
        }else{
            button.classList.remove('active');
        }
    })
}

//search functionality

const searchBar = document.getElementById("search");

searchBar.addEventListener('submit', (event)=>{
    searchItems();
})
function searchItems(){
    let search = searchBar.value;
    let dataFiltered = [];
    let postsHolderHTML = [];

    allpostTypes.forEach(postType=>{
        if (items[postType]){
            dataFiltered.push(items[postType].find(({title})=> title.toLowerCase() === search.toLowerCase()));
            items[postType].forEach(item=>{
                if ((item.title.toLowerCase().search(search.toLowerCase())) >= 0){
                    dataFiltered.push(item);
                }
                else if ((item.category.toLowerCase().search(search.toLowerCase())) >= 0){
                    dataFiltered.push(item);
                }
                else if ((item.highlight.toLowerCase().search(search.toLowerCase())) >= 0){
                    dataFiltered.push(item);
                }
                else if ((item.content.toLowerCase().search(search.toLowerCase())) >= 0){
                    dataFiltered.push(item);
                }
            });
        };
    });

    dataFiltered.forEach(item => {
        if (item) postsHolderHTML.push(`<div class="post">
                                            <img src="${item.src}">
                                            <div class="infoText">
                                                <p class="img-label">${item.title}</p>
                                                <a href="#" class="category">${item.category}</a>
                                                <p class="highlight">${item.highlight}</p>
                                            </div>
                                            <a class="btn read-more" href="${item.path}">Read More</a>
                                        </div>`);
    });
    if (postsHolderHTML.length > 0){
        $postsHolder.innerHTML = postsHolderHTML.join("");
        localStorage.setItem('searchResult',postsHolderHTML);
    }else{
        const noResMsg = `
        <div class="no-results-message">
            <h3>No Results</h3>
            <p>Search again or check out a category:</p>
            <div class="categorySelectionHolder">
                <button onclick="productSelected('all')" class="categorySelection">All</button>
                <button onclick="productSelected('article')" class="categorySelection">Articles</button>
                <button onclick="productSelected('artist')" class="categorySelection">Artists</button>
                <button onclick="productSelected('album')" class="categorySelection">Albums</button>
                <button onclick="productSelected('venue')" class="categorySelection">Venues</button>
            </div>
        </div>
        `;
        $postsHolder.innerHTML = noResMsg;
        localStorage.setItem('searchResult',noResMsg);
    }
}

let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox and Opera
}