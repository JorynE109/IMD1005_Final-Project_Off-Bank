const $eventsHolder = document.getElementById('calendarDisplay');
const $heading = document.getElementById('calHeading');
const $yearText = document.getElementById('yearText');
let items;

const epoch = new Date(1970, 0, 1);
const now = new Date();
const tz_epoch_ms = now.valueOf() - now.getTimezoneOffset() * 60 * 1000 ; // getTimezoneOffset returns minutes
const epoch_days =  tz_epoch_ms / ( 24 * 60 * 60 * 1000 );
let day = 0;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const $monthSelectButtonsHolder = document.getElementById('monthSelectButtonsHolder');
let listView = 0;

window.addEventListener("load", (event) => {
    setup();
    fetchItems();
});
async function fetchItems(){
    const res = await fetch('../events/events.json');
    const data = await res.json();
    
    if(res.ok) items = data;
    console.log(items);
    // console.log(localStorage.getItem('listView'));
    populateCalDiv(localStorage.getItem('listView'));
}

function setup(){
    $heading.innerText = monthNames[curMonth()];
    $yearText.innerText = curYear();
    // console.log(localStorage.getItem('listView'));

    if(localStorage.getItem('listView'))
    {
        listView = localStorage.getItem('listView');
    }
}
function curMonth(){
    return (new Date(0, 0, (epoch_days + day)).getMonth());
}
function curYear(){
    return (new Date(0, 0, (0 + epoch_days + day)).getFullYear());
}
function daysInMonth() {
    return (new Date(curYear(), curMonth(), 0)).getDate();
}
function changeMonth(changeBy){
    if (changeBy == -1)
    {
        day = day - daysInMonth();
    }
    else if (changeBy == 1)
    {
        day = day + daysInMonth();
    }
    $heading.innerText = monthNames[(new Date(curYear(), curMonth(), day)).getMonth()];
    $yearText.innerText = (new Date(curYear(), curMonth(), day)).getFullYear();
    populateCalDiv(listView);
}


function getEvents(day, month, year){
    eventsHTML = []
    items.forEach((event)=>{
        let evDate = new Date(event.date);
        // console.log(evDate);
        let checkDate = new Date((new Date(curYear(), curMonth(), day)).getFullYear(), (new Date(curYear(), curMonth(), day)).getMonth(), day);
        // console.log(checkDate);
        if(evDate.getFullYear() == checkDate.getFullYear() && evDate.getMonth() == checkDate.getMonth() && evDate.getDate() == checkDate.getDate())
        {
            eventsHTML.push(`
                <div class="eventDispSm">
                    <p class="evTitle">${event.title}</p>
                </div>
                `);
        }
    })
    //console.log(eventsHTML);
    return eventsHTML.join("");
}

function fillCalendar(){
    listView = 0;
    localStorage.setItem('listView', 0);
    console.log(localStorage.getItem('listView'));
    
    calHeadingsHTML = [];

    dayNames.forEach((day)=>{
        calHeadingsHTML.push(`
            <div class="calendarDay">
                <p>${day}</p>
            </div>
            `);
    });

    calDaysHTML = [];
    days = daysInMonth((curMonth() + 1), curYear());

    for (let i = 1; i <= days; i++)
    {
        
        calDaysHTML.push(`
            <div class="calDay">
                <p>${i}</p>
                <div class="dayEvent">
                    ${getEvents(i, curMonth(), curYear())}
                </div>
            </div>
            `);
    }
    $eventsHolder.innerHTML = calHeadingsHTML.join("") + calDaysHTML.join("");
}

function dayToFirstOfWeek(){
}
function changeWeek(changeBy){
    if (changeBy == -1)
    {
        day = day - 7;
    }
    if (changeBy == 0)
    {
    }
    if (changeBy == 1)
    {
        day = day + 7;
    }

    fillCalList();
}

function fillCalList(){
    listView = 1;
    localStorage.setItem('listView', 1);

    calListHTML = [];
    days = daysInMonth((curMonth() + 1), curYear());

    calListHTML.push(`
        <div class="listChangeButtonsHolder">
            <button class="weekSelect" onclick="changeWeek(-1)">Prev</button>
            <button class="weekSelect" onclick="changeWeek(0)">Today</button>
            <button class="weekSelect" onclick="changeWeek(1)">Next</button>
        </div>
    `);
    for (let i = day; i <= (day + 6); i++)
    {
        listDay = new Date(curYear(), curMonth(), i);   
        weekDay = listDay.getDay();
        console.log(listDay);
        console.log(weekDay);
        calListHTML.push(`
            <div class="calDay">
                <h3>${dayNames[weekDay]} ${listDay.getDate()}</h3>
                <div class="dayEvent">
                    ${getEvents(listDay.getDate(), curMonth(), curYear())}
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
    $heading.innerText = monthNames[curMonth()];
    $yearText.innerText = curYear();
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
        fillCalendar();
    }
}