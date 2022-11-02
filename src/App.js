
import './App.scss';
import {useState, useEffect} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState("SESSION");
  const [play, setPlay] = useState(false);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1)
    }
  }, 1000);
const handleBreakDecrease = () =>{
if (breakLength > 1){
  setBreakLength(breakLength - 1)
}
  };
  const handleBreakIncrease = () => {
if(breakLength < 60){
  setBreakLength(breakLength + 1);
}
  };
  const handleSessionDecrease = () =>{
if (sessionLength > 1) {
  setSessionLength(sessionLength - 1);
  setTimeLeft(timeLeft - 60);
}
  };
  const handleSessionIncrease = () => {
if (sessionLength < 60){
  setSessionLength(sessionLength + 1);
  setTimeLeft(timeLeft + 60);
}
  };  


  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  } //decreases the seconds in the clock
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  const resetTimer = () =>{
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  }
  const clock = () => {
    if(play){
 
      resetTimer()
    }else {
      clearTimeout(timeout);
    }
  }
   //if clock is running, decrease the seconds and resetTimer function

   useEffect(() => {
    clock()
  }, [play, timeLeft, timeout]);

const timeFormatter = () => {
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft - minutes * 60;
const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
return `${formattedMinutes}:${formattedSeconds}`;
}
const title = timingType === "SESSION" ? "Session" : "Break";


  return (
    <div>
    <div className="wrapper fancy-border">
      <h1>My 25 + 5 clock</h1>
<div className = "break-session-length">
  <div className = "break-box">
    <h3 id = "break-label">Break length</h3>
  
  <button className = "btn " disabled = {play}id = "break-increment"onClick = {handleBreakIncrease} ><i class='fas fa-chevron-circle-up'></i></button>
  <strong id = "break-length">{breakLength}</strong>
  <button className = "btn " disabled = {play}id = "break-decrement" onClick = {handleBreakDecrease}><i class='fas fa-chevron-circle-down'></i></button>
</div>

  <div className = "session-box">
    <h3 id = "session-label">Session length</h3>
  
  <button className = "btn " disabled = {play} id = "session-increment" onClick = {handleSessionIncrease}><i class='fas fa-chevron-circle-up' ></i></button>
  <strong id = "session-length">{sessionLength}</strong>
  <button className = "btn " disabled = {play} id = "session-decrement" onClick = {handleSessionDecrease}><i class='fas fa-chevron-circle-down'></i></button>
</div>
</div>
<div className = "timer-wrapper">
  <div className='timer'> 
  <span></span>
        <span></span>
         <span></span>
        <span></span>
        <div class="content">
  <h2 id = "timer-label">{title}</h2>
<h3 id = "time-left">{timeFormatter()}</h3>
</div>
<div className = "buttons">
    <button className = "btn timebtn" id = "start_stop" onClick = {handlePlay}><i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i></button>
    <button className = "btn timebtn " id = "reset" onClick = {handleReset}><i class="fa-solid fa-rotate-right"></i></button><br/>
  </div>



</div>

  
</div> 
<audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
    </div>
  );
}

export default App;
