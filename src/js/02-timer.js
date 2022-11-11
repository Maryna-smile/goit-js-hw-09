import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');

let timerId = null;

btn.disabled = true;

flatpickr(date, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            btn.disabled = true;
        } else {
            btn.disabled = false;

            Notiflix.Notify.success('Lets go?');
        }
    },
});

btn.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {

    btn.disabled = true;
    date.disabled = true;
    timerId = setInterval(() => {
        const choosenDate = new Date(date.value);
        const timeToFinish = choosenDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeToFinish);

        day.textContent = addZero(days);
        hour.textContent = addZero(hours);
        min.textContent = addZero(minutes);
        sec.textContent = addZero(seconds);

        if (timeToFinish < 1000) {
            clearInterval(timerId);
            date.disabled = false;
        }
    }, 1000);
}

function addZero(value) {
    return `${value}`.padStart(2, '0');
}

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

