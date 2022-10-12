const refs = {
  btnStart: document.querySelector('button[data-start]'),

  btnStop: document.querySelector('button[data-stop]'),
};

const bodyNew = document.body;
let switchTime = null;
refs.btnStart.addEventListener('click', onClickAddColorFone);
refs.btnStop.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function onClickAddColorFone() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  switchTime = setInterval(() => {
    bodyNew.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onClickStop() {
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
  clearInterval(switchTime);
}
