

const monthEl = document.getElementById('month');
const dateEl = document.getElementById('date');
const datesEl = document.querySelector('.dates');
const prevEl = document.querySelector('.prev .arrow');
const nextEl = document.querySelector('.next .arrow');
const addEventBtn = document.getElementById('add-event');
const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');
const eventListEl = document.getElementById('event-list');
const activeMonthEl = document.getElementById('active-month');
const activeDateEl = document.getElementById('active-date');
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const formatEl = document.querySelector('.format');




const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = [];

function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    monthEl.innerText = `${months[currentMonth]}-${currentYear}`;
    dateEl.innerText = new Date().toDateString();
    activeMonthEl.innerText = `${months[currentMonth]} ${currentYear}`;
    activeDateEl.innerText = new Date().toDateString();

   
   
    let days = '';




    for (let i = firstDayOfMonth; i > 0; i--)
         {
        days += `<div class="prev-date">${lastDayOfLastMonth - i + 1}</div>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++)
         {
        if (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

   
   
    const nextDays = 7 - new Date(currentYear, currentMonth + 1, 0).getDay() - 1;

    for (let i = 1; i <= nextDays; i++) {
        days += `<div class="next-date">${i}</div>`;
    }

 
    datesEl.innerHTML = days;
}

prevEl.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextEl.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

addEventBtn.addEventListener('click', () => {
    const eventTitle = eventTitleInput.value;
    const eventDate = eventDateInput.value;


    if (eventTitle && eventDate) {
        events.push({ title: eventTitle, date: eventDate });
        renderEvents();
        eventTitleInput.value = '';
        eventDateInput.value = '';
    
    
    }


});

function renderEvents() {
    eventListEl.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${event.date}: ${event.title} 
            <button class="edit" onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>`;
            eventListEl.appendChild(li);
   
        });


    }

function editEvent(index) {
    const event = events[index];
    eventTitleInput.value = event.title;
    eventDateInput.value = event.date;
    deleteEvent(index);


}



function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();


}


function updateTime() {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const format = hour >= 12 ? 'PM' : 'AM';



    hour = hour % 12;
    hour = hour ? hour : 12; 

    hourEl.innerText = hour < 10 ? '0' + hour : hour;
    minuteEl.innerText = minute < 10 ? '0' + minute : minute;
    secondEl.innerText = second < 10 ? '0' + second : second;
    formatEl.innerText = format;
}



setInterval(updateTime, 1000);
updateTime();
renderCalendar();