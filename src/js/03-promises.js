import Notiflix, { Notify } from 'notiflix';

const formJs = document.querySelector('.form');

formJs.addEventListener('submit', submitHandler);

function submitHandler(evt) {
  evt.preventDefault()

  let delay = Number(formJs.delay.value);

  for (let i = 1; i <= formJs.amount.value; i += 1) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  delay += Number(formJs.step.value);
  }
}

function createPromise(position, delay) {
  const options = { position, delay }
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(options);
      } else {
        reject(options);
      }
    }, delay);
  });
  
};
