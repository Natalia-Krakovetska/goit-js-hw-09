const refs = {
    bodyEl: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    text: document.querySelector('p')
};


console.log(refs.bodyEl);
console.log(refs.btnStart);
console.log(refs.btnStop);
const DELAY = 1000;
let timerId = null;
refs.btnStart.addEventListener('click', onBtnChangeColor);
refs.btnStop.addEventListener('click', onBtnStopChangeColor);
function onBtnChangeColor(){
    refs.bodyEl.style.backgroundColor=getRandomHexColor();
    timerId = setInterval (() => {
        refs.bodyEl.style.backgroundColor=getRandomHexColor();
    },DELAY);
   
    refs.btnStart.setAttribute("disabled", "disabled");
    refs.btnStop.removeAttribute("disabled", "disabled");
};
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  function onBtnStopChangeColor() {
        clearInterval(timerId);
        refs.btnStart.removeAttribute("disabled", "disabled");
        refs.btnStop.setAttribute("disabled", "disabled");
  }
