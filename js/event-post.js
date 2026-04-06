
const $evDisp = document.getElementById('evDisplay');
let params = new URL(document.location.toString()).searchParams;
console.log(params);
let evDate = params.get("date");
let evTitle = params.get("title");
console.log(evDate + " & " + evTitle);

window.addEventListener('load', (event) => {
    if($evDisp)
    {
        console.log("loading event");
        loadEvent();
    }
});
async function loadEvent(){
    const res = await fetch('../events/events.json');
    const data = await res.json();
    let events;
    if(res.ok) events = data;
    console.log(events);
    
    updateEvDisp(events);
}
function updateEvDisp(events){
    console.log("updating events");
    let eventHTML = [];
    events.forEach(ev => {
        if(ev.title == evTitle && ev.date == evDate)
        {
            eventHTML.push(`
            <div id="eventInfo">
                <div class="title">
                    <h1>${ev.title}</h1>
                    <div class="sub">
                        <p class="venue">${ev.venue}</p>
                        <p class="date">${ev.date}</p>
                    </div>
                </div>
                <div class="evPoster">
                    <img src="${ev.poster}" alt="poster for ${ev.title}" aria-hidden="true">
                </div>
                <div class="infoText">
                    <p class="price">Cover: $${ev.price}</p>
                    <a class="link btn" href="${ev.link}">Get Tickets</a>
                </div>
            </div>
            <div id="eventBody">
                <div id="artists">
            `)
            if (ev.artistInfo)
            {
                ev.artistInfo.forEach(artist=>{
                    eventHTML.push(`
                        <div class="artistInfo">
                            <h2 class="artistName">${artist.name}</h2>
                            <img src="${artist.photo}" alt="profile photo for ${artist.name}" aria-hidden="true">
                            <p class="artistGenre">${artist.genre}</p>
                            <p class="artistDesc">${artist.desc}</p>
                            
                    `)
                    if (artist.path)
                    {
                        eventHTML.push(`<a href="${artist.path}" class="btn">Read More</a>
                        </div>`)
                    }
                    else
                    {
                        eventHTML.push(`<a href="${artist.url}" class="btn">See More</a>
                        </div>`)
                    }
                });
            }
            eventHTML.push(`</div>`);
            //may have to format date prettier and venue goes to the venue article on posts
        }
    });
    $evDisp.innerHTML = eventHTML.join("");
}