let url = new URL(window.location.href);

let page = url.pathname.split("/");
page.pop()

page = page[page.length - 1];
console.log(page);

if (page == "" || page == "IMD1005_Final-Project_Off-Bank")
{
    page = "home";
}
if (page == "date")
{
    page = "event";
}
console.log(page);
const pageIcons = {
    "home": `<img class="navicon" src="img/icon/home-48.png">`,
    "posts": `<img class="navicon" src="img/icon/article-48.png">`,
    "events": `<img class="navicon" src="img/icon/calendar-48.png">`,
    "about": `<img class="navicon" src="img/icon/smile-48.png">`,
    "event": `<img class="navicon" src="img/icon/smile-48.png">`
}
const hamburgerIcon = `<img class="navHamburger" src="img/icon/hamburger-48.png">`
let $navHTML;

if (pageIcons[page] == undefined)
{
    $navHTML = `<div id="mobileHeader">
        <div id="blurFilter"></div>
        <div id="mobileNav">
            <div id="mobileNavToggleContainer">
                <button type="button" id="mobileNavToggle" onclick="toggleMobileLinks()">${hamburgerIcon}</button>
                <div id="pageDisplay">${page}</div>
            </div>
            <div id="mobileLinksContainer">
                <a href="#"><span class="navtitle">Home</span>${pageIcons.home}</a>
                <a href="posts/"><span class="navtitle">Posts</span>${pageIcons.posts}</a>
                <a href="events/"><span class="navtitle">Events</span>${pageIcons.events}</a>
                <a href="about/"><span class="navtitle">About</span>${pageIcons.about}</a>
            </div>
        </div>
    </div>
    <div id="widescreenNav">
        <a href="#"><span class="navtitle">Home</span>${pageIcons.home}</a>
        <a href="posts/"><span class="navtitle">Posts</span>${pageIcons.posts}</a>
        <a href="events/"><span class="navtitle">Events</span>${pageIcons.events}</a>
        <a href="about/"><span class="navtitle">About</span>${pageIcons.about}</a>
    </div>`;
}
else{
    $navHTML = `
    <div id="mobileHeader">
        <div id="blurFilter"></div>
        <div id="mobileNav">
            <div id="mobileNavToggleContainer">
                <button type="button" id="mobileNavToggle" onclick="toggleMobileLinks()">${hamburgerIcon}</button>
                <div id="pageDisplay">${pageIcons[page]}<span>${page}</span></div>
            </div>
            <div id="mobileLinksContainer">
                <a href="#"><span class="navtitle">Home</span>${pageIcons.home}</a>
                <a href="posts/"><span class="navtitle">Posts</span>${pageIcons.posts}</a>
                <a href="events/"><span class="navtitle">Events</span>${pageIcons.events}</a>
                <a href="about/"><span class="navtitle">About</span>${pageIcons.about}</a>
            </div>
        </div>
    </div>
    <div id="widescreenNav">
        <a href="#"><span class="navtitle">Home</span>${pageIcons.home}</a>
        <a href="posts/"><span class="navtitle">Posts</span>${pageIcons.posts}</a>
        <a href="events/"><span class="navtitle">Events</span>${pageIcons.events}</a>
        <a href="about/"><span class="navtitle">About</span>${pageIcons.about}</a>
    </div>`;
}

const $nav = document.querySelector('nav');
insertNav();


const $mobileLinksContainer = document.getElementById('mobileLinksContainer');
const $mobileLinksToggle = document.getElementById('mobileNavToggle');
const $blurFilter = document.getElementById('blurFilter');

async function insertNav(){
    $nav.innerHTML = $navHTML;
    setTimeout(() => {
        $blurFilter.style.opacity = 0
        }, 480);
    //setTimeout($blurFilter.style.opacity = 0, 400);
}

$blurFilter.addEventListener('click', (event)=>{
    toggleMobileLinks();
    $blurFilter.style.opacity = 0;

})

function toggleMobileLinks(){
    $mobileLinksContainer.classList.toggle('show');
    $blurFilter.style.opacity = 'inherit';
    $blurFilter.classList.toggle('show');
}