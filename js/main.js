const $newsDisplay = document.getElementById('newsDisplay');
const $recentPostsDisplay = document.getElementById('recentPostsDisplay');
let events;
let posts;

window.addEventListener('load', (event) => {
    if($newsDisplay)
        loadEvents();
    if($recentPostsDisplay)
        loadPosts();
});
async function loadEvents(){
    const res = await fetch('/page/events/events.json');
    const data = await res.json();
    
    if(res.ok) events = data;
    console.log(events);
    
    updateNewsDisplay();
}
function updateNewsDisplay()
{
    // eventsHTML = []
    // for (let i = 0; i < 3; i++)
    // {
    //     eventsHTML.push(`<a class="eventPrev" href="/page/events/date/?date=${events[i].date}&title=${events[i].title}">
    //                         <h4 class="evTitle">${events[i].title}</h4>
    //                         <p class="evDate">${events[i].date}</p>
    //                     </a>`);

    // }
    // $newsDisplay.innerHTML = eventsHTML.join("");

    let eventsHTML = [];
    for (let i = 0; i < events.length; i++)
    {
        //console.log(new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()))
        if ((new Date(events[i].date)) >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())) && eventsHTML.length < 3)
        {
            eventsHTML.push(`<a class="eventPrev" href="/page/events/date/?date=${events[i].date}&title=${events[i].title}">
                                <p class="evTitle">${events[i].title}</p>
                                <p class="evDate">${events[i].date}</p>
                             </a>`);
        }
    }
    $newsDisplay.innerHTML = eventsHTML.join("");
}
async function loadPosts(){
    const res = await fetch('/page/posts/posts.json');
    const data = await res.json();
    
    if(res.ok) posts = data;
    console.log(posts);

    updatePostsDisplay();
}
function updatePostsDisplay()
{

}