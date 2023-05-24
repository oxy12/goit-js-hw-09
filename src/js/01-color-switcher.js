function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.body,
};
let timerId = null;

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.btnStart.classList.add('disabled');
  if (refs.btnStart.classList.contains('disabled')) {
    refs.btnStart.disabled = true;
  }

  if (refs.btnStop.classList.contains('disabled')) {
    refs.btnStop.disabled = false;
    refs.btnStop.classList.remove('disabled');
  }
}

function onBtnStopClick() {
  clearInterval(timerId);

  refs.btnStop.classList.add('disabled');
  if (refs.btnStop.classList.contains('disabled')) {
    refs.btnStop.disabled = true;
  }

  if (refs.btnStart.classList.contains('disabled')) {
    refs.btnStart.disabled = false;
    refs.btnStart.classList.remove('disabled');
  }
}
