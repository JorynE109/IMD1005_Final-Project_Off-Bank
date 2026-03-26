let url = new URL(window.location.href);

// for (let i = 0; i < url.length; i++)
// {
//     if (url[i] == "")
//     {
//         for (let r = i; r < url.length; r++)
//         {
//             url[r] = url[r + 1];
//         }
//         url.pop();
//     }
// }
// console.log(url);

// let page = url[url.length - 1];

let page = url.pathname.split("/");
page.pop()
console.log(page);

page = page[page.length - 1];
console.log(page);

if (page == "")
{
    page = "home";
}
console.log(page);
const pageIcons = {
    "home": `<img class="navicon" src="/img/icon/icons8-home.svg">`,
    "posts": `<img class="navicon" src="/img/icon/icons8-article.svg">`,
    "events": `<img class="navicon" src="/img/icon/icons8-calendar-24.png">`,
    "about": `<img class="navicon" src="/img/icon/icons8-smile-24.png">`
}


const $navHTML = `
<div id="mobileHeader">
    <div id="mobileNav">
        <div id="mobileNavToggleContainer">
            <button type="button" id="mobileNavToggle" onclick="toggleMobileLinks()">=</button>
            <p>${pageIcons[page]}</p>
        </div>
        <div id="mobileLinksContainer">
            <a href="/"><span class="navtitle">Home</span><img class="navicon" src="/img/icon/icons8-home.svg"></a>
            <a href="/page/posts/"><span class="navtitle">Posts</span><img class="navicon" src="/img/icon/icons8-article.svg"></a>
            <a href="/page/events/"><span class="navtitle">Events</span><img class="navicon" src="/img/icon/icons8-calendar-24.png"></a>
            <a href="/page/about/"><span class="navtitle">About</span><img class="navicon" src="/img/icon/icons8-smile-24.png"></a>
        </div>
    </div>
    <p id="pageDisplay">${page}</p>
</div>
<div id="widescreenNav">
    <!-- the spans gotta be switched for icons, keep class the same -->
    <a href="/" class="active"><span class="navtitle">Home</span><img class="navicon" src="/img/icon/icons8-home.svg"></a>
    <a href="/page/posts/"><span class="navtitle">Posts</span><img class="navicon" src="/img/icon/icons8-article.svg"></a>
    <a href="/page/events/"><span class="navtitle">Events</span><img class="navicon" src="/img/icon/icons8-calendar-24.png"></a>
    <a href="/page/about/"><span class="navtitle">About</span><img class="navicon" src="/img/icon/icons8-smile-24.png"></a>
</div>`;

const $nav = document.querySelector('nav');
insertNav();
async function insertNav(){
    $nav.innerHTML = $navHTML;
}
const $mobileLinksContainer = document.getElementById('mobileLinksContainer');
const $mobileLinksToggle = document.getElementById('mobileNavToggle');

function toggleMobileLinks(){
    $mobileLinksContainer.classList.toggle('show');
}