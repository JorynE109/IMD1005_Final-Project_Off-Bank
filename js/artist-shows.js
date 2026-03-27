const $upcomingShowsDisp = document.getElementById('upcomingShows');
console.log($upcomingShowsDisp);
const $artist = $upcomingShowsDisp.dataset['artist'];
let $events = [];

window.addEventListener('load', (event) => {
    if($upcomingShowsDisp)
        loadEvents();
});
async function loadEvents(){
    const res = await fetch('/page/events/events.json');
    const data = await res.json();
    
    if(res.ok) $events = data;
    
    updateShowsDisplay();
}
function updateShowsDisplay(){
    let dataFiltered = [];
    upcomingShowsHTML = [];
    $events.forEach(ev=>
    {
        if(ev.artistInfo)
        {
            ev.artistInfo.forEach(artist=>{
                if ((artist.name.toLowerCase().search($artist.toLowerCase())) >= 0){
                    dataFiltered.push(ev);
                }
            });
        }
    });
    console.log(dataFiltered);
    console.log(upcomingShowsHTML);
    upcomingShowsHTML.push(`
            <h3>Shows featuring ${$artist}</h3>
            <div class="artistShows">
            `);

    for (let i = 0; i < dataFiltered.length; i++)
    {
        console.log(dataFiltered[i].title);
        if (upcomingShowsHTML.length <= 3)
        {
            console.log(dataFiltered[i].title);
            upcomingShowsHTML.push(`
            <a class="show" href="/page/events/date/?date=${dataFiltered[i].date}&title=${dataFiltered[i].title}">
                <p class="showTitle">${dataFiltered[i].title}</p><p class="showDate">${dataFiltered[i].date}</p>
            </a>
            `)
        }
    }
    upcomingShowsHTML.push(`
            </div>
            `)
    $upcomingShowsDisp.innerHTML = upcomingShowsHTML.join("");
}


