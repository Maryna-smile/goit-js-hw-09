function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const btnStartRef = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let timerId;

btnStartRef.addEventListener('click', () => {
    timerId = setInterval(() => {
            bodyRef.style.backgroundColor = getRandomHexColor();
      }, 1000);
      btnStartRef.disabled = true;
}
);

btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStartRef.disabled = false;

})
