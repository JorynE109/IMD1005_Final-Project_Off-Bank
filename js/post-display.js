
const $articleDisp = document.getElementById('articleDisplay');
let params = new URL(document.location.toString()).searchParams;
console.log(params);
let pTitle = params.get("title");
let pType = params.get("type").toLowerCase();
console.log(pTitle);
console.log(pType);

let $events = [];

window.addEventListener('load', (event) => {
    if($articleDisp)
    {
        console.log("loading article");
        
        loadUpcomingEvents();
    }
});
async function loadUpcomingEvents(){
    const res = await fetch('../events/events.json');
    const data = await res.json();
    
    if(res.ok) $events = data;
    loadArticle();
}
async function loadArticle(){
    let posts;
    try{
        const res = await fetch('../posts/posts.json');
        const data = await res.json();
        if(res.ok) posts = data;
    }
    catch(error){
        $articleDisp.innerHTML =  `<h2>Unable to load</h2><p>We apologize for the inconvenience. Try again later.</p>`
    }
    
    
    if(pType == 'artist')
    {
        updateArtistReview(posts);
    }
    else if(pType == 'venue')
    {
        updateVenueReview(posts);
    }
    else if(pType == 'album')
    {
        updateAlbumReview(posts);
    }
}
function getEventsFromArtist()
{
    let dataFiltered = [];
    reviewHTML = [];
    $events.forEach(ev=>
    {
        if(ev.artistInfo)
        {
            ev.artistInfo.forEach(artist=>{
                if ((artist.name.toLowerCase().search(pTitle.toLowerCase())) >= 0){
                    dataFiltered.push(ev);
                }
            });
        }
    });
    reviewHTML.push(`
            <h3>Shows featuring ${pTitle}</h3>
            <div class="artistShows">
            `);
    for (let i = 0; i < dataFiltered.length; i++)
    {
        console.log(dataFiltered[i].title);
        if ((new Date(dataFiltered[i].date)) >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())) && reviewHTML.length <= 3)
        {
            console.log(dataFiltered[i].title);
            reviewHTML.push(`
            <a class="show" href="../event/?date=${dataFiltered[i].date}&title=${dataFiltered[i].title}">
                <p class="showTitle">${dataFiltered[i].title}</p><p class="showDate">${dataFiltered[i].date}</p>
            </a>
            `)
        }
    }
    reviewHTML.push(`
            </div>
            `);
    return reviewHTML;
}
function getAlbumsFromArtist(posts)
{
    let dataFiltered = [];
    albumsListHTML = [];
    posts['album'].forEach(album=>
    {
        if ((album.artistName.toLowerCase().search(pTitle.toLowerCase())) >= 0){
            dataFiltered.push(album);
        }
    });
    albumsListHTML.push(`
            <h3>Albums from ${pTitle}</h3>
            <div class="albumList">
            `);
    for (let i = 0; i < dataFiltered.length; i++)
    {
        console.log(dataFiltered[i].title);
            albumsListHTML.push(`
            <a class="album" href="../post/?title=${dataFiltered[i].title}&type=album">
                <p class="albumTitle">${dataFiltered[i].title}</p><p class="albumDate">${dataFiltered[i].date}</p>
            </a>
            `)
    }
    albumsListHTML.push(`
            </div>
            `);
    return albumsListHTML;
}
function updateArtistReview(posts){
    let eventsHTML = getEventsFromArtist();
    let albumsHTML = getAlbumsFromArtist(posts);
    
    let postHTML = [];
    posts[pType].forEach(p => {
        console.log(`comparing ${p.title} vs ${pTitle}`)
        console.log(`comparing ${p.category.toLowerCase()} vs ${pType}`)
        if(p.title == pTitle && p.category.toLowerCase() == pType)
        {
            postHTML.push(`
            <h1>${p.title}</h1>
            <div class="imgDisp">    
                <img src="${p.src}" aria-hidden="true" alt="artist profile photo for ${p.title}">
            </div>
            <div class="infoText">
                <p class="genre">${p.genre}</p>
                <p class="locale">${p.locale}</p>
            </div>
            <div class="mainInfo">
                <p class="highlight">${p.highlight}</p>
            </div>
            `);
            if (p.review)
            {
                postHTML.push(`
                ${p.review}
                `)
            }
            else
            {
                postHTML.push(`
                <div class="review unreviewed">
                    <h2>Unreviewed</h2>
                    <p>This page exists to collect information while a written review from the Off-Bank team is pending</p>
                </div>
                `)
            }
            if (eventsHTML.length > 2)
            {
                postHTML.push(eventsHTML.join(""))
            }
            if (albumsHTML.length > 2)
            {
                postHTML.push(albumsHTML.join(""))
            }
            else
            {
                postHTML.push(`
                    <h3>Shows featuring ${pTitle}</h3>
                        <div class="artistShows">
                        <p>No upcoming shows. Check back later. </p>
                        </div>
                    `)
            }
        }
    });
    if (postHTML.length > 0)
    {
        $articleDisp.innerHTML = postHTML.join("");
    }
    else
    {
        $articleDisp.innerHTML = `
        <h1>Unable to Load Article</h1>
        <p>Please check again later.</p>
        `
    }
}
function updateVenueReview(posts){
    let dataFiltered = [];
    reviewHTML = [];
    console.log($events)
    $events.forEach(ev=>
    {
        if(ev.venue)
        {
            if ((ev.venue.toLowerCase().search(pTitle.toLowerCase())) >= 0)
            {
                dataFiltered.push(ev);
            }
        }
        //add for other types
    });
    reviewHTML.push(`
            <h3>Shows at ${pTitle}</h3>
            <div class="artistShows">
            `);

            console.log(`${dataFiltered}`);
    for (let i = 0; i < dataFiltered.length; i++)
    {
        console.log(dataFiltered[i].title);
        if ((new Date(dataFiltered[i].date)) >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())) && reviewHTML.length <= 3)
        {
            console.log(dataFiltered[i].title);
            reviewHTML.push(`
            <a class="show" href="../event/?date=${dataFiltered[i].date}&title=${dataFiltered[i].title}">
                <p class="showTitle">${dataFiltered[i].title}</p><p class="showDate">${dataFiltered[i].date}</p>
            </a>
            `)
        }
    }
    reviewHTML.push(`
            </div>
            `);

    console.log("updating posts");
    let postHTML = [];
    posts[pType].forEach(p => {
        console.log(`comparing ${p.title} vs ${pTitle}`)
        console.log(`comparing ${p.category.toLowerCase()} vs ${pType}`)
        if(p.title == pTitle && p.category.toLowerCase() == pType)
        {
            postHTML.push(`
            <h1>${p.title}</h1>
            <div class="imgDisp">    
                <img src="${p.src}" aria-hidden="true" alt="profile photo for ${p.title}">
            </div>
            <div class="infoText">
                <p class="genre">${p.genre}</p>
                <p class="locale">${p.locale}</p>
            </div>
            `);
            if (p.review)
            {
                postHTML.push(`
                ${p.review}
                `)
            }
            else
            {
                postHTML.push(`
                <div class="review unreviewed">
                    <h2>Unreviewed</h2>
                    <p>This page exists to collect information while a written review from the Off-Bank teaam is pending</p>
                </div>
                `)
            }
            if (reviewHTML.length > 2)
            {
                postHTML.push(reviewHTML.join(""))
            }
        }
    });
    if (postHTML.length > 0)
    {
        $articleDisp.innerHTML = postHTML.join("");
    }
    else
    {
        $articleDisp.innerHTML = `
        <h1>Unable to Load Article</h1>
        <p>Please check again later.</p>
        `
    }
}
function updateAlbumReview(posts){
    let dataFiltered = [];
    reviewHTML = [];
    let $artistName;
    $events.forEach(ev=>
    {
        if(ev.artistInfo)
        {
            ev.artistInfo.forEach(artist=>{
                posts[pType].forEach(post=>{
                    if(post.title == pTitle)
                    {
                        $artistName = post.artistName;
                    }
                    console.log($artistName);
                })
                if ((artist.name.toLowerCase().search($artistName.toLowerCase())) >= 0){
                    dataFiltered.push(ev);
                }
            });
        }
    });
    console.log(dataFiltered);
    reviewHTML.push(`
            <h3>Shows featuring ${$artistName}</h3>
            <div class="artistShows">
            `);

            console.log(`${dataFiltered}`);
    for (let i = 0; i < dataFiltered.length; i++)
    {
        console.log(dataFiltered[i].title);
        if ((new Date(dataFiltered[i].date)) >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate())) && reviewHTML.length <= 3)
        {
            console.log(dataFiltered[i].title);
            reviewHTML.push(`
            <a class="show" href="../event/?date=${dataFiltered[i].date}&title=${dataFiltered[i].title}">
                <p class="showTitle">${dataFiltered[i].title}</p><p class="showDate">${dataFiltered[i].date}</p>
            </a>
            `)
        }
    }
    reviewHTML.push(`
            </div>
            `);

    console.log("updating posts");
    let postHTML = [];
    posts[pType].forEach(p => {
        console.log(`comparing ${p.title} vs ${pTitle}`)
        console.log(`comparing ${p.category.toLowerCase()} vs ${pType}`)
        if(p.title == pTitle && p.category.toLowerCase() == pType)
        {
            postHTML.push(`
            <h1>${p.title}</h1>
            <div class="imgDisp">    
                <img src="${p.src}" aria-hidden="true" alt="album cover for ${p.title}">
            </div>
            <div class="infoText">
                <p class="album-type">${p.albumType}</p>
                <p class="genre">${p.genre}</p>
            </div>
            <div class="moreAlbumInfo">
                <p>${p.albumType} by <a href="${p.artistPath}">${p.artistName}</a></p>
            </div>
            `);
            if (p.trackList)
            {
                //ADD FUNCTIONALITY
            }
            if (p.review)
            {
                postHTML.push(`
                ${p.review}
                `)
            }
            else
            {
                postHTML.push(`
                <div class="review unreviewed">
                    <h2>Unreviewed</h2>
                    <p>This page exists to collect information while a written review from the Off-bank Team is pending</p>
                </div>
                `)
            }
            if (reviewHTML.length > 2)
            {
                postHTML.push(reviewHTML.join(""))
            }
        }
    });
    if (postHTML.length > 0)
    {
        $articleDisp.innerHTML = postHTML.join("");
    }
    else
    {
        $articleDisp.innerHTML = `
        <h1>Unable to Load Article</h1>
        <p>Please check again later.</p>
        `
    }
}
