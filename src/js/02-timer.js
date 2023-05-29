import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const elements = {
  input: document.getElementById('datetime-picker'),
  timer: document.querySelector('.timer'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownIntervalId = null;
let targetDate = 0;
const currentDate = Date.now();

elements.timer.style.display = 'flex';
const timerElements = elements.timer.children;
for (const timerElement of timerElements) {
  timerElement.style.display = 'flex';
  timerElement.style.flexDirection = 'column';
  timerElement.style.alignItems = 'center';
  timerElement.style.padding = '10px 20px 0 0';
}

elements.startButton.addEventListener('click', () => {
  clearInterval(countdownIntervalId);
  countdownIntervalId = setInterval(handleTimer, 1000);
  elements.startButton.setAttribute('disabled', 'disabled');
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0].getTime();
    if (targetDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      elements.startButton.setAttribute('disabled', 'disabled');
    } else {
      elements.startButton.removeAttribute('disabled');
    }
  },
};

flatpickr(elements.input, options);

function addLeadingZero(value) {
  elements.days.textContent = value.days.toString().padStart(2, '0');
  elements.hours.textContent = value.hours.toString().padStart(2, '0');
  elements.minutes.textContent = value.minutes.toString().padStart(2, '0');
  elements.seconds.textContent = value.seconds.toString().padStart(2, '0');
}

const handleTimer = () => {
  const currentDate = new Date();
  const time = targetDate - currentDate.getTime();
  if (time <= 0) {
    clearInterval(countdownIntervalId);
    return;
  }
  const timeObj = convertMs(time);
  addLeadingZero(timeObj);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}