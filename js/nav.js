let url = new URL(window.location.href);

let page = url.pathname.split("/");
page.pop()

page = page[page.length - 1];
console.log(page);

if (page == "")
{
    page = "home";
}
if (page == "date")
{
    page = "event";
}
console.log(page);
const pageIcons = {
    "home": `<img class="navicon" src="/img/icon/icons8-home.svg">`,
    "posts": `<img class="navicon" src="/img/icon/icons8-article.svg">`,
    "events": `<img class="navicon" src="/img/icon/icons8-calendar-24.png">`,
    "about": `<img class="navicon" src="/img/icon/icons8-smile-24.png">`,
    "event": `<img class="navicon" src="/img/icon/icons8-smile-24.png">`
}
const hamburgerIcon = `<img class="navHamburger" src="/img/icon/icons8-hamburger.svg">`
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
                <a href="/"><span class="navtitle">Home</span><img class="navicon" src="/img/icon/icons8-home.svg"></a>
                <a href="/page/posts/"><span class="navtitle">Posts</span><img class="navicon" src="/img/icon/icons8-article.svg"></a>
                <a href="/page/events/"><span class="navtitle">Events</span><img class="navicon" src="/img/icon/icons8-calendar-24.png"></a>
                <a href="/page/about/"><span class="navtitle">About</span><img class="navicon" src="/img/icon/icons8-smile-24.png"></a>
            </div>
        </div>
    </div>
    <div id="widescreenNav">
        <!-- the spans gotta be switched for icons, keep class the same -->
        <a href="/" class="active"><span class="navtitle">Home</span><img class="navicon" src="/img/icon/icons8-home.svg"></a>
        <a href="/page/posts/"><span class="navtitle">Posts</span><img class="navicon" src="/img/icon/icons8-article.svg"></a>
        <a href="/page/events/"><span class="navtitle">Events</span><img class="navicon" src="/img/icon/icons8-calendar-24.png"></a>
        <a href="/page/about/"><span class="navtitle">About</span><img class="navicon" src="/img/icon/icons8-smile-24.png"></a>
    </div>`;
}
else{
    $navHTML = `
    <div id="mobileHeader">
        <div id="blurFilter"></div>
        <div id="mobileNav">
            <div id="mobileNavToggleContainer">
                <button type="button" id="mobileNavToggle" onclick="toggleMobileLinks()">${hamburgerIcon}</button>
                <div id="pageDisplay">${pageIcons[page]}${page}</div>
            </div>
            <div id="mobileLinksContainer">
                <a href="/"><span class="navtitle">Home</span><img class="navicon" src="/img/icon/icons8-home.svg"></a>
                <a href="/page/posts/"><span class="navtitle">Posts</span><img class="navicon" src="/img/icon/icons8-article.svg"></a>
                <a href="/page/events/"><span class="navtitle">Events</span><img class="navicon" src="/img/icon/icons8-calendar-24.png"></a>
                <a href="/page/about/"><span class="navtitle">About</span><img class="navicon" src="/img/icon/icons8-smile-24.png"></a>
            </div>
        </div>
    </div>
    <div id="widescreenNav">
        <!-- the spans gotta be switched for icons, keep class the same -->
        <a href="/" class="active"><span class="navtitle">Home</span><img class="navicon" src="/img/icon/icons8-home.svg"></a>
        <a href="/page/posts/"><span class="navtitle">Posts</span><img class="navicon" src="/img/icon/icons8-article.svg"></a>
        <a href="/page/events/"><span class="navtitle">Events</span><img class="navicon" src="/img/icon/icons8-calendar-24.png"></a>
        <a href="/page/about/"><span class="navtitle">About</span><img class="navicon" src="/img/icon/icons8-smile-24.png"></a>
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