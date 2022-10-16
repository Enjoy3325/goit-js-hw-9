import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDatetime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timerDiv: document.querySelector('.timer'),
  field: document.querySelector('.field'),
};
// Styles
document.body.style.backgroundColor = '#8073c9';
refs.inputDatetime.style.cssText =
  'width: 280px; height: 50px; font-size: xx-large; margin-bottom: 20px; color:#021216; background-color: #1eb0d2; border:1px solid white; border-radius: 10px; display: flex; flex-direction: justify-content; text-align: center';
refs.btnStart.style.cssText =
  'color:#021216; background-color: #1eb0d2; border:1px solid white; margin-bottom: 20px; border-radius: 50%; font-size: xx-large; width: 100px; height: 100px; align-items: center; text-align: center; cursor: pointer';
refs.timerDiv.style.cssText =
  'display-flex: center; flex-direction: justify-column; font-size: x-large';

convertDate = {};
let timerSet = null;
let timeInit = 0;
const timer = {
  start() {
    const curentTime = Date.now();
    console.log(curentTime);
    // const startTime = selectedDate;
    timerSet = setInterval(() => {
      const deltaTime = (timeInit -= 1000);
      convertDate = convertMs(deltaTime);
      Object.keys(convertDate).forEach(elem => {
        document.querySelector(`span[data-${elem}]`).innerHTML = addLeadingZero(
          convertDate[elem]
        );
      });
      // console.log(convertMs(deltaTime));
      if (deltaTime < 1000) {
        clearInterval(timerSet);
      }
    }, 1000);
  },
};

// Listeners
refs.btnStart.addEventListener('click', startTimer);
// refs.btnStart.addEventListener('mouseover', onHoverBtn);
// refs.btnStart.addEventListener('mouseout', onHoverBtn);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      // Разница между будущим и настоящим временем
      timeInit = selectedDates[0] - options.defaultDate;
      convertDate = convertMs(timeInit);
      Object.keys(convertDate).forEach(elem => {
        document.querySelector(`span[data-${elem}]`).innerHTML = addLeadingZero(
          convertDate[elem]
        );
      });

      return Notify.success('Right value');
    }
  },
};
flatpickr(refs.inputDatetime, options);
// Start interval timer
function startTimer(e) {
  timer.start();
  if (e.type === 'click') {
    e.target.style.background = '#dda808';
  }
  return (refs.btnStart.disabled = true);
}

// Add '0' example 00:00:01
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// Time converter  function
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
}
// function onHoverBtn(e) {
//   if (e.type === 'mouseover') {
//     e.target.style.background = '#dda808';
//     if (e.type === 'mouseout') {
//       e.target.style.background = '#1eb0d2';
//     }
//   }
// }
