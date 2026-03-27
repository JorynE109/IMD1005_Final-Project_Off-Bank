const $upcomingShowsDisp = document.getElementById('venueUpcomingShows');
console.log($upcomingShowsDisp);
const $venue = $upcomingShowsDisp.dataset['venue'];
let $events = [];

window.addEventListener('load', (event) => {
    if($upcomingShowsDisp)
        loadUpcomingEvents();
});
async function loadUpcomingEvents(){
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
        if(ev.venue)
        {
            if ((ev.venue.toLowerCase().search($venue.toLowerCase())) >= 0){
                dataFiltered.push(ev);
            }
        }
    });
    console.log(dataFiltered);
    console.log(upcomingShowsHTML);
    upcomingShowsHTML.push(`
            <h3>Shows featuring ${$venue}</h3>
            <div class="venueShows">
            `);

    for (let i = 0; i < dataFiltered.length; i++)
    {
        console.log(dataFiltered[i].title);
        if ((new Date(dataFiltered[i].date)) >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())) && upcomingShowsHTML.length <= 3)
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


