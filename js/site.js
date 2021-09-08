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
 * Gets the next service
 * 
 * @param {date} now 
 * @returns {*}
 */
function getNextService(now) {
    let nextServices = [
        { title: 'Sunday Morning Worship', date: getSundayMorning(new Date(now)) },
        { title: 'Sunday Evening Bible Study', date: getSundayEvening(new Date(now)) },
        { title: 'Wednesday Bible Study', date: getWednesdayEvening(new Date(now)) }
    ].sort((a,b) => a.date - b.date);
    return nextServices[0];
}

/**
 * Gets the date and time for the next Sunday morning service
 * 
 * @param {date} now Current date and time
 * @return {date} The date and time for the next Sunday morning service
 */
function getSundayMorning(now) {
    const nextDate = nextWeekdayDate(now, 7);
    nextDate.setHours(10,30,0);
    return nextDate;
}

/**
 * Gets the date and time for the next Sunday evening service
 * 
 * @param {date} now Current date and time
 * @return {date} The date and time for the next Sunday evening service
 */
function getSundayEvening(now) {
    const nextDate = nextWeekdayDate(now, 7);
    nextDate.setHours(6,0,0);
    return nextDate;
}

/**
 * Gets the date and time for the next Wednesday evening service
 * 
 * @param {date} now Current date and time
 * @return {date} The date and time for the next Wednesday evening service
 */
 function getWednesdayEvening(now) {
    const nextDate = nextWeekdayDate(now, 3);
    nextDate.setHours(6,30,0);
    return nextDate;
}

/**
 * 
 * @param {date} date 
 * @param {number} day_in_week 1=Monday, 2=Tuesday, 3=Wednesday, ..., 7=Sunday
 * @returns 
 */
function nextWeekdayDate(date, day_in_week) {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + (day_in_week - 1 - nextDate.getDay() + 7) % 7 + 1);
    return nextDate;
}