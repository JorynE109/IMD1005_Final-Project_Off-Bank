const $newsDisplay = document.getElementById('newsDisplay');
const $recentPostsDisplay = document.getElementById('recentPostsDisplay');
const $artistHighlight = document.getElementById('artistHighlightDisplay');
let events;
let posts;
const header = document.querySelector('header');
const headerImg = document.querySelector('.logoImg');

window.addEventListener('load', (event) => {
    if($newsDisplay)
        loadEvents();
    if($recentPostsDisplay)
        loadPosts();
    header.addEventListener('mouseover', (event)=>{
        headerImg.src = '../img/logo-lg.png';
    })
    header.addEventListener('mouseout', (event)=>{
        headerImg.src = '../img/logo.png';
    })
});
async function loadEvents(){
    try{
        const res = await fetch('../events/events.json');
        const data = await res.json();
        if(res.ok) events = data;
        updateNewsDisplay();
    }catch(error){
        console.log(error);
        $newsDisplay.innerHTML = `<h3>No Events</h3><p>There are no events to display at this time. Please try again later.</p>`
    }
    
}
function updateNewsDisplay()
{
    let eventsHTML = [];
    for (let i = 0; i < events.length; i++)
    {
        if ((new Date(events[i].date)) >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())) && eventsHTML.length < 3)
        {
            eventsHTML.push(`<a class="eventPrev" href="../event/?date=${events[i].date}&title=${events[i].title}">
                                <p class="evTitle">${events[i].title}</p>
                                <p class="evDate">${events[i].date}</p>
                             </a>`);
        }
    }
    $newsDisplay.innerHTML = eventsHTML.join("");
}
async function loadPosts(){
    try{
        const res = await fetch('../posts/posts.json');
        const data = await res.json();
        
        if(res.ok) posts = data;

        updatePostsDisplay();
        updateArtistHighlight();
    }catch(error){
        console.log(error);
        $recentPostsDisplay.innerHTML = `<h3>No Posts</h3><p>There are no posts to display at this time. Please try again later.</p>`
        $artistHighlight.innerHTML = `<p>Unable to load artist details</p>`
    }
}
function updatePostsDisplay()
{
    let allpostTypes = ['artist', 'album', 'venue', 'article'];
    let allPosts = [];
    let postsDispHTML = [];

    allpostTypes.forEach(category => {
        for (let i = 0; i < posts[category].length; i++)
        {
            allPosts.push(posts[category][i]);
        }
    });
    console.log(allPosts);
    
    const sorted = allPosts.sort((a, b) => (new Date(a.date)) - (new Date(b.date))).reverse();
    
    console.log(sorted);

    for (let i = 0; i < 3; i++)
    {
        postsDispHTML.push(`
            <div class="post">
                <a href="${sorted[i].path}">
                    <p class="postTitle">${sorted[i].title}</p>
                    <p class="postDate">${sorted[i].date}</p>
                </a>
            </div>
            `);
    }
    $recentPostsDisplay.innerHTML = postsDispHTML.join("");
}
function updateArtistHighlight()
{
    let allArtists = [];

    posts['artist'].forEach(artist => {
        allArtists.push(artist);
    });
    
    const dailyArtist = (new Date().getDate() % allArtists.length);

    $artistHighlight.innerHTML = `
    <div class="highlightedArtist">
        <img class="artistImg" src="${posts['artist'][dailyArtist].src}">
        <div class="artistInfoText">
            <p class="artistTitle">${posts['artist'][dailyArtist].title}</p>
            <p class="artistGenre">${posts['artist'][dailyArtist].genre}</p>
            <p class="artistDesc">${posts['artist'][dailyArtist].highlight}</p>
            <a class="artistLink btn" href="${posts['artist'][dailyArtist].path}">Read More</a>
        </div>
    </div>
    `
}