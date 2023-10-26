import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';
const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysJs = document.querySelector('span[data-days]');
const hoursJs = document.querySelector('span[data-hours]');
const minutesJs = document.querySelector('span[data-minutes]');
const secondsJs = document.querySelector('span[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
let timeDif = 0;
let startId= null;
let formatDate = null;

console.dir(datePicker)
const options = {
  enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
    },
};
const fp = flatpickr(datePicker, options);
function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();
  if (selectedDates < currentDate) {
    return Notify.failure('Please choose a date in the future');
  }
  timeDif = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDif);
  renderDate(formatDate);
};

startBtn.addEventListener('click', handlerStart);

function handlerStart(evt) {
  startId = setInterval(startTimer, 1000);
};


// Timer

function startTimer() {
  startBtn.disabled = true;
  datePicker.disabled = true;
  timeDif -= 1000;
  if (secondsJs.textContent <= 0 && minutesJs.textContent <= 0 ) {
    Notify.success('Time end');
    clearInterval(startId);
  } else {
    formatDate = convertMs(timeDif);
    renderDate(formatDate);
  }
};

function renderDate(formatDate) {
  secondsJs.textContent = formatDate.seconds;
  minutesJs.textContent = formatDate.minutes;
  hoursJs.textContent = formatDate.hours;
  daysJs.textContent = formatDate.days;
};
