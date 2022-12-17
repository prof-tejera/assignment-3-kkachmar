import { useState, useEffect, useRef } from 'react';
import TimerButton from "../generic/TimerButton";
import Controls from "../generic/Controls";
import {timeMath} from "../../utils/helpers"

const Countdown = ({time, autoplay, onPause, onReset, onStop, onSkip, noControls, editing, state}) => {

const [isPaused, setIsPaused] = useState(!autoplay);
const [stopped, setStopped] = useState(false);
const [milliseconds, setSeconds] = useState(state ? state.ms : time?time:0);
const [value, setValue]  = useState(time ? time : 0)
const [timer, setTimer] = useState(timeMath(time ? time : 0))
const interval = useRef(null);

useEffect( ()=>{
    setTimer(timeMath(milliseconds)) 

    if(milliseconds<=-1){
        setStopped(true);
    }
}, [milliseconds, isPaused, stopped])

const clickPlayPause = () => {
    setIsPaused(!isPaused)
    if(noControls){
        onPause()
    }
}

useEffect(() => {
    if (!isPaused && milliseconds > -1 && !editing) {
        var x = milliseconds;
      interval.current = setInterval(() => {
        x = x-10;
        setSeconds(x);
      }, 10);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused, stopped, milliseconds, editing])


const addTime = () =>{
    setSeconds(milliseconds+15000)
    setValue(milliseconds+15000)
}

const removeTime= () => {
    setSeconds(milliseconds-15000)
    setValue(milliseconds-15000)
}

const stopTimer= () => {
    clickPlayPause()
    setSeconds(0)
    if(noControls){
        onStop()
    }
}

const resetTimer = () => {
    clickPlayPause();
    setSeconds(value)
    if(noControls){
        onReset()
    }
}

const skipToEnd = () => {
    setSeconds(0);
    stopTimer();
    setIsPaused(true);
    if(noControls){
        onSkip()
    }
}

return(
    <div style={{display: 'inline-Flex'}}>
        <div className="timerCircle">
            <div className="timerText" style={{ marginTop: 'calc(60px + 2vh)'}}>{timer}
            <Controls resetAction={resetTimer} pauseAction={clickPlayPause} stopAction={stopTimer} 
                skipAction={skipToEnd} isPaused={isPaused}></Controls>
            </div>
        </div>
        <div className={noControls ? 'hide': 'stopwatchControls'}>
            <TimerButton text="+" onClick={addTime}></TimerButton>
            <TimerButton text="-" onClick={removeTime}></TimerButton>
        </div>
    </div>
    
);

};

export default Countdown;
