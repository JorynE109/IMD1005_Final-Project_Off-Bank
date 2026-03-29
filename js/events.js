const $eventsHolder = document.getElementById('calendarDisplay');
const $heading = document.getElementById('calHeading');
const $yearText = document.getElementById('yearText');
let items;

const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let day = date.getDate();

const $monthBtns = document.getElementById('monthSelectButtonsHolder');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = [
    "S<span class='cont'>un</span><span class='comp'>day</span>", 
    "M<span class='cont'>on</span><span class='comp'>day</span>", 
    "T<span class='cont'>ue</span><span class='comp'>sday</span>", 
    "W<span class='cont'>ed</span><span class='comp'>nesday</span>", 
    "T<span class='cont'>hu</span><span class='comp'>rsday</span>", 
    "F<span class='cont'>ri</span><span class='comp'>day</span>", 
    "S<span class='cont'>at</span><span class='comp'>urday</span>"];

const $monthSelectButtonsHolder = document.getElementById('monthSelectButtonsHolder');
let listView = 0;

const $eventsList = document.getElementById('eventsList');

window.addEventListener("load", (event) => {
    setup();
    fetchItems();
});
async function fetchItems(){
    const res = await fetch('/page/events/events.json');
    const data = await res.json();
    
    if(res.ok) items = data;
    console.log(items);
    //console.log(localStorage.getItem('listView'));
    populateCalDiv(localStorage.getItem('listView'));
}

function setup(){
    $heading.innerText = monthNames[month];
    $yearText.innerText = year;
    //console.log(localStorage.getItem('listView'));

    if(localStorage.getItem('listView'))
    {
        listView = localStorage.getItem('listView');
    }
}

function changeMonth(changeBy){
    if (changeBy == -1)
    {
        if (month == 0)
        {
            month = 11;
            year--;
        }
        else
        {
            month--;
        }
    }
    else if (changeBy == 1)
    {
        if(month < 12)
        {
            month++;
        }
        if(month == 12)
        {
            month = 0;
            year++;
        }
    }
    else if(changeBy == 0)
    {
        month = date.getMonth();
        year = date.getFullYear();
        day = date.getDate();
    }
    $heading.innerText = monthNames[month];
    $yearText.innerText = year;
    populateCalDiv(listView);
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// function getEvents(day, month, year){
//     eventsHTML = []
//     items.forEach((event)=>{
//         let evDate = new Date(event.date);
//         //console.log(evDate);
//         let checkDate = new Date(year, month, day);
//         //console.log(checkDate);
//         if(evDate.getFullYear() == checkDate.getFullYear() && evDate.getMonth() == checkDate.getMonth() && evDate.getDate() == checkDate.getDate())
//         {
//             eventsHTML.push(`<div class="eventDispSm">
//                                 <p class="evTitle">${event.title}</p>
//                             </div>`);
//         }
//     })
//     //console.log(eventsHTML);
//     return eventsHTML.join("");
// }

function getEventsIdx(sDay, sMonth, sYear){
    let eventsIdx = [];
    //console.log(`checking ${sYear}-${sMonth}-${sDay}`);
    for(let i = 0; i < items.length;i++)
    {
        let evDate = new Date(items[i].date);
        //console.log(`checking against ${evDate.getFullYear()}-${evDate.getMonth()}-${evDate.getDate()}`);
        //console.log(evDate);
        let checkDate = new Date(sYear, sMonth, sDay);
        //console.log(checkDate);
        if(evDate.getFullYear() == checkDate.getFullYear() && evDate.getMonth() == checkDate.getMonth() && evDate.getDate() == checkDate.getDate())
        {
            eventsIdx.push(i);
        }
    }
    return eventsIdx;
}
function getEventSummaryHTML(indexes){
    eventsHTML = []
    indexes.forEach((idx)=>{
            eventsHTML.push(`<div class="eventDispSm">
                                <div class="eventDot"><p>•</p></div>
                                <p class="evTitle">${items[idx].title}</p>
                            </div>`);

    })
    return eventsHTML.join("");
}
function getEventDetailsHTML(indexes){
    eventsHTML = []
    indexes.forEach((ev)=>{
        console.log(ev);
        console.log(items[ev].title);
        eventsHTML.push(`<div class="eventDispFull">
                    <h2>${items[ev].title}</h2>
                    <div id="eventInfo">
                        <p class="date">${items[ev].date}</p>
                        <p class="venue">${items[ev].venue}</p>
                        <p class="price">Cover: ${items[ev].price}</p>
                        <a class="link" href="${items[ev].link}">Get Tickets</a>
                    </div>
                    <div class="eventBody">
                        <img src="${items[ev].poster}">
                        <div class="artists">
                `);
        if (items[ev].artistInfo)
        {
            items[ev].artistInfo.forEach(artist=>{
                eventsHTML.push(`
                    <div class="artistInfo">
                        <h3 class="artistName">${artist.name}</h3>
                        <img src="${artist.photo}">
                        <div>
                            <p class="artistGenre">${artist.genre}</p>
                            <p class="artistDesc">${artist.desc}</p>
                            <a class="btn" href="${artist.path}">See More</a>
                        </div>
                    </div>
                `)
            })
        }
        eventsHTML.push(`</div></div>`);
    })
    return eventsHTML.join("");
}

function fillCalendar(){
    listView = 0;
    localStorage.setItem('listView', 0);
    //console.log(localStorage.getItem('listView'));
    if ($monthBtns)
    {
        $monthBtns.classList.remove('hidden');
    }
    
    day = date.getDate();
    calHeadingsHTML = [];

    dayNames.forEach((day)=>{
        calHeadingsHTML.push(`
            <div class="calendarDay">
                <p>${day}</p>
            </div>
            `);
    });

    calDaysHTML = [];
    days = daysInMonth((month + 1), year);

    for (let i = 1; i <= days; i++)
    {
        let evTitlesHTML = [];
        evTitlesHTML.push(getEventSummaryHTML(getEventsIdx(i, month, year)));
        //console.log(evTitlesHTML);
        calDaysHTML.push(`
            <div class="calDay isCalendar" data-day="${i}" data-month="${month}" data-year="${year}">
                <p>${i}</p>
                <div class="dayEvent">
                    ${evTitlesHTML.join("")}
                </div>
            </div>
            `);
    }
    $eventsHolder.innerHTML = calHeadingsHTML.join("") + calDaysHTML.join("");
    watchCalDayClicks();
}

function dayToFirstOfWeek(){
    day = day - date.getDay();
}
function getLastWeekOfMonth(){
    let daysThisMonth = daysInMonth((month + 1), year);

    let lastDayOfMonth = new Date(year, month, daysThisMonth); 
    
    let lastSundayOfMonth = lastDayOfMonth.getDate() - lastDayOfMonth.getDay();

    return lastSundayOfMonth;
}
function getFirstWeekOfMonth(){
    let firstOfTheMonth = new Date(year, month, 1);
    console.log(firstOfTheMonth);
    
    for (let i = 0; i < 7; i++)
    {
        if((new Date(year, month, i + 1)).getDay() == 0){
            return(new Date(year, month, i + 1).getDate());
        }
    }
}
function changeWeek(changeBy){
    if (changeBy == -1)
    {
        if (day <= 7)
        {
            if (month > 0)
            {
                month --;
            }
            else
            {
                year--;
                month = 11;
            }
            day = getLastWeekOfMonth();
        }
        else 
        {
            day = day - 7;
        }
    }
    if (changeBy == 0)
    {
        day = date.getDate() - date.getDay();
        month = date.getMonth();
        year = date.getFullYear();
    }
    if (changeBy == 1)
    {
        if (day + 7 > daysInMonth((month + 1), year))
        {
            if(month < 11)
            {
                month++;
            }
            else
            {
                month = 0;
                year++;
            }
            day = getFirstWeekOfMonth();
        }
        else
        {
            day = day + 7;
        }
    }
    localStorage.setItem('day', day);
    localStorage.setItem('month', month);
    localStorage.setItem('year', year);

    fillCalList();
}

function fillCalList(){
    listView = 1;
    localStorage.setItem('listView', 1);
    if ($monthBtns)
    {
        $monthBtns.classList.add('hidden');
    }
    $eventsList.innerHTML = "";

    calListHTML = [];
    days = daysInMonth((month + 1), year);

    calListHTML.push(`
        <div class="listChangeButtonsHolder">
            <button class="weekSelect" onclick="changeWeek(-1)">Prev</button>
            <button class="weekSelect" onclick="changeWeek(0)">Today</button>
            <button class="weekSelect" onclick="changeWeek(1)">Next</button>
        </div>
    `);
    for (let i = day; i <= (day + 6); i++)
    {
        listDay = new Date(year, month, i);   
        weekDay = listDay.getDay();
        //console.log(listDay);
        //console.log(weekDay);
        calListHTML.push(`
            <div class="calDay isList" data-day="${listDay.getDate()}" data-month="${listDay.getMonth()}" data-year="${listDay.getFullYear()}">
                <h3>${dayNames[weekDay]} ${listDay.getDate()}</h3>
                <div class="dayEvent">
                    ${getEventSummaryHTML(getEventsIdx(listDay.getDate(), month, year))}
                </div>
            </div>
            `);
        
    }
    calListHTML.push(`
        <div class="listChangeButtonsHolder">
            <button class="weekSelect" onclick="changeWeek(-1)">Prev</button>
            <button class="weekSelect" onclick="changeWeek(0)">Today</button>
            <button class="weekSelect" onclick="changeWeek(1)">Next</button>
        </div>
        `);
    $eventsHolder.innerHTML = calListHTML.join("");
    $heading.innerText = monthNames[month];
    $yearText.innerText = year;
    watchCalDayClicks();
}

function populateCalDiv(isList)
{
    if(isList == 1)
    {
        $eventsHolder.classList.add('listview');
        $monthSelectButtonsHolder.classList.add('hidden');
        dayToFirstOfWeek();
        fillCalList();
    }
    else
    {
        $eventsHolder.classList.remove('listview');
        $monthSelectButtonsHolder.classList.remove('hidden');
        day = date.getDate();
        fillCalendar();
    }
}
/*
SEE EVENT DETAILS
*/
function watchCalDayClicks(){
    const $calDays = document.querySelectorAll('.calDay');


    $calDays.forEach(cDay => {
        cDay.addEventListener('click', function handleCDayClick(event){
            console.log("clicked " + cDay.dataset.day);
            if (getEventsIdx(cDay.dataset.day, cDay.dataset.month, cDay.dataset.year).length > 0)
            {
                if (listView)
                {
                    $calDays.forEach(dy=>{
                        dy.firstElementChild.nextElementSibling.innerHTML = getEventSummaryHTML(getEventsIdx(dy.dataset.day, dy.dataset.month, dy.dataset.year));
                    })
                    cDay.firstElementChild.nextElementSibling.innerHTML = getEventDetailsHTML(getEventsIdx(cDay.dataset.day, cDay.dataset.month, cDay.dataset.year));
                }
                else
                {
                    $eventsList.innerHTML = getEventDetailsHTML(getEventsIdx(cDay.dataset.day, cDay.dataset.month, cDay.dataset.year));
                }
            }
            else
            {
                if(!listView)
                {
                    $eventsList.innerHTML = "<p id='noEvents'>No Events</p>";
                }
            }
        })
    })
}

const button = document.getElementById('viewSelect');
button.addEventListener('click', function() {
  this.classList.add('viewSelectClicked');
});


let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox and Opera
}