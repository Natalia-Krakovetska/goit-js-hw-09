import Notiflix from 'notiflix';
const refs = {
  formEl: document.querySelector(".form"),
};
refs.formEl.addEventListener('submit', onSubmitForm);

const createPromise = (position, delay) => {
    return new Promise((resolve, reject)=> {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject ({position, delay});
        }
      }, delay);
    }
)
}
function onSubmitForm(event){
  event.preventDefault();
let delay = Number(event.currentTarget.delay.value);
const STEP = Number(event.currentTarget.step.value);
const AMOUNT = Number(event.currentTarget.amount.value);
for (let i = 0; i < AMOUNT; i+=1) {  
     delay += STEP;
    createPromise(i, delay).then(onSuccess).catch(onError);
}
}
function onSuccess({position, delay}){
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

  function onError({position, delay}){
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  };
 
 


