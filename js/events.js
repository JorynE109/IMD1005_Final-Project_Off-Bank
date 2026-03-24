const $eventsHolder = document.getElementById('calendarDisplay');
const $heading = document.getElementById('calHeading');
const $yearText = document.getElementById('yearText');
let items;

const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let day = date.getDate();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const $monthSelectButtonsHolder = document.getElementById('monthSelectButtonsHolder');
let listView = 0;

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

    for(let i = 0; i < items.length;i++)
    {
        let evDate = new Date(items[i].date);
        //console.log(evDate);
        let checkDate = new Date(sYear, sMonth, sDay);
        //console.log(checkDate);
        if(evDate.getFullYear() == checkDate.getFullYear() && evDate.getMonth() == checkDate.getMonth() && evDate.getDate() == checkDate.getDate())
        {
            eventsIdx.push(i);
        }
        return eventsIdx;
    }

    items.forEach((event)=>{
        let evDate = new Date(event.date);
        //console.log(evDate);
        let checkDate = new Date(year, month, day);
        //console.log(checkDate);
        if(evDate.getFullYear() == checkDate.getFullYear() && evDate.getMonth() == checkDate.getMonth() && evDate.getDate() == checkDate.getDate())
        {
            eventsIdx.push(event.idx);
        }
    })
    return eventsIdx;
}
function getEventSummaryHTML(indexes){
    eventsHTML = []
    indexes.forEach((idx)=>{
            eventsHTML.push(`<div class="eventDispSm">
                                <p class="evTitle">${items[idx].title}</p>
                            </div>`);

    })
    return eventsHTML.join("");
}
function getEventDetailsHTML(indexes){
    eventsHTML = []
    indexes.forEach((idx)=>{
            eventsHTML.push(`<div class="eventDispFull">
                                <p class="eTitle">${items[idx].title}</p>
                                <p class="eDate">${items[idx].date}</p>
                                <p class="eVenue">${items[idx].venue}</p>
                                <p class="ePrice">$${items[idx].price}</p>
                            </div>`);

    })
    return eventsHTML.join("");
}

function fillCalendar(){
    listView = 0;
    localStorage.setItem('listView', 0);
    //console.log(localStorage.getItem('listView'));
    
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
        
        calDaysHTML.push(`
            <div class="calDay" data-day="${i}" data-month="${month}" data-year="${year}">
                <p>${i}</p>
                <div class="dayEvent">
                    ${getEventSummaryHTML(getEventsIdx(i, month, year))}
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
            <div class="calDay">
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
const $eventsList = document.getElementById('eventsList');
function watchCalDayClicks(){
    const $calDays = document.querySelectorAll('.calDay');


    $calDays.forEach(cDay => {
        cDay.addEventListener('click', function handleCDayClick(event){
            console.log("clicked " + cDay.dataset.day);
            if (getEventsIdx(cDay.dataset.day, cDay.dataset.month, cDay.dataset.year).length > 0)
            {
                $eventsList.innerHTML = getEventDetailsHTML(getEventsIdx(cDay.dataset.day, cDay.dataset.month, cDay.dataset.year));
            }
        })
    })
}