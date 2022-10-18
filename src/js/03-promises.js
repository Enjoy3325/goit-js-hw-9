import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
form.addEventListener('submit', onStartForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(promise);
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onStartForm(e) {
  e.preventDefault();
  const clikCurrentTg = e.currentTarget.elements;
  let delayCurrent = Number(clikCurrentTg.delay.value);
  const amountCurrent = Number(clikCurrentTg.amount.value);
  const stepCurrent = Number(clikCurrentTg.step.value);
  for (let i = 1; i <= amountCurrent; i += 1) {
    createPromise(i, delayCurrent).then(fulfilled).catch(rejected);
    delayCurrent += stepCurrent;
  }
}

const fulfilled = ({ position, delay }) => {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
const rejected = ({ position, delay }) => {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
