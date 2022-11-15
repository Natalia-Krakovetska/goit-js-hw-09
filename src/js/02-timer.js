import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const refs ={
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    daysTimer: document.querySelector('span[data-days]'),
    houresTimer: document.querySelector('span[data-hours]'),
    minutesTimer: document.querySelector('span[data-minutes]'),
    secondsTimer: document.querySelector('span[data-seconds]'),
    boxTimer: document.querySelector(".timer"),
    sectionTimer: document.querySelector(".field"),

};

refs.btnStart.setAttribute("disabled", true);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
      onClose(selectedDates) {
        
        if(selectedDates[0] < new Date()){
            refs.btnStart.disabled = true;
          
            return Notiflix.Notify.failure('Please choose a date in the future');
        } else{
            Notiflix.Notify.success(
                'Good choice!',
                {
                  timeout: 2000,
                },
              );
            refs.btnStart.disabled = false;           
            refs.btnStart.addEventListener('click', ()=>{
                timer.start()
            });
           
        }

    },
  };
const fp = flatpickr(refs.input, options);

const timer = {
    intervalId: null,
    start(){         
        this.intervalId = setInterval(()=>{
        const currentTime =  Date.now();  
           
           let delayTime = fp.selectedDates[0] - currentTime;     
            if(delayTime < 0) {
                refs.daysTimer.textContent = "00";
                refs.houresTimer.textContent = "00";
                refs.minutesTimer.textContent = "00";
                refs.secondsTimer.textContent = "00";
                return;
            }
            const timeComponents = convertMs(delayTime);          
            refs.daysTimer.textContent = timeComponents.days;
            refs.houresTimer.textContent = timeComponents.hours;
            refs.minutesTimer.textContent = timeComponents.minutes;
            refs.secondsTimer.textContent = timeComponents.seconds;
           
           if(delayTime < 1000 ){
            clearInterval(this.intervalId);
            refs.btnStart.disabled = true;
           }       
        
        },1000);
      }
}



 

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
   const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return {days, hours, minutes, seconds}

  };

  function addLeadingZero(value){
         return String(value).padStart(2, "0");

};

  
