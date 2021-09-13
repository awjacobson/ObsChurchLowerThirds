const services = Object.freeze([
    { title: "Sunday Morning Worship", day: 0, hours: 10, minutes: 30 }, // Sundays at 10:30 AM
    { title: "Sunday Evening Bible Study", day: 0, hours: 18, minutes: 0 }, // Sundays at 6:00 PM
    { title: "Wednesday Bible Study", day: 3, hours: 18, minutes: 30 } // Wednesdays at 6:30 PM
]);

(function() {
    initCountdown();
})();    

function initCountdown() {
    const nextService = getNextService(new Date());

    setTitle(nextService.title);
    setDate(nextService.date);

    setInterval(startCountdown, 1000, nextService.date);
}

function setTitle(title) {
    const titleElement = document.getElementById('lower-third-title');
    titleElement.innerHTML = title;
}

function setDate(date) {
    const dateElement = document.getElementById('lower-third-date');
    dateElement.innerHTML = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function setCountdown(countdown) {
    const countdownElement = document.getElementById('countdown-timer');
    countdownElement.innerHTML = countdown;
}

/**
 * 
 * @param {number} target target time value in milliseconds
 */
function startCountdown(target) {
    let distance = target - new Date().getTime();
    
    if (distance < 0) {
        stopCountdown();
    }

    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % (day)) / hour);
    const minutes = Math.floor((distance % (hour)) / minute);
    const seconds = Math.floor((distance % (minute)) / second);

    // const countdown = `${days}:${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
    const countdown = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    setCountdown(countdown);
}

function stopCountdown() {
    // clear interval

    const countdownElement = document.getElementById('countdown-timer');
    countdownElement.style.visibility = 'hidden';
}

/**
 * Gets the next service that will happen from the list of services
 * @param {date} now 
 * @returns {*} The service object which will occur next
 */
function getNextService(now) {
    const nextServices = services.map(service => ({ ...service, date: getNextDate(now, service.day, service.hours, service.minutes) }));
    return nextServices.sort((a,b) => a.date - b.date)[0];
}

/**
 * Get the date and time of the next day of the week and time (could be current date)
 * @param {date} date 
 * @param {number} day_in_week 
 * @param {number} hours 
 * @param {number} minutes 
 * @returns 
 */
function getNextDate(date, day_in_week, hours, minutes) {
    const currDate = new Date(date);
    const currDay = currDate.getDay();
    if (currDay === day_in_week) {
        const currHours = currDate.getHours();
        const currMinutes = currDate.getMinutes();
        if (hours >= currHours || (hours === currHours && minutes >= currMinutes)) {
            currDate.setHours(hours, minutes, 0);
            return currDate; 
        }
    }

    const nextDate = nextWeekdayDate(date, day_in_week);
    nextDate.setHours(hours, minutes, 0);
    return nextDate
}

/**
 * Get the date of the next day in week
 * @param {date} date 
 * @param {number} day_in_week 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, ..., 6=Saturday
 * @returns 
 */
function nextWeekdayDate(date, day_in_week) {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + (day_in_week - 1 - nextDate.getDay() + 7) % 7 + 1);
    return nextDate;
}