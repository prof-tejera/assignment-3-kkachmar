import { useState, useEffect, useRef } from 'react';
import TimerButton from "../generic/TimerButton";
import Controls from "../generic/Controls";
import clock from "./../../assets/clock.png"
import {timeMath} from "../../utils/helpers"

const Stopwatch = ({time, autoplay, onPause, onReset, onStop, onSkip, noControls, editing, state}) => {     

const [isPaused, setIsPaused] = useState(!autoplay);
const [stopped, setStopped] = useState(false);
const [goal, setGoal] = useState(time ? time : 0)
const [milliseconds, setSeconds] = useState(state ? goal-state.ms:0);
const [value, setValue]  = useState(0)
const [timer, setTimer] = useState(timeMath(0))
const interval = useRef(null);

useEffect( ()=>{
    setTimer(timeMath(milliseconds)) 
    if(milliseconds<=-1){
        setStopped(true);
    }
}, [milliseconds, isPaused, stopped])



const clickPlayPause = () => {
    setIsPaused(!isPaused);
    if(noControls){
        onPause()
    }
}

// https://stackoverflow.com/questions/70710122/how-to-use-setinterval-with-react-useeffect-hook-correctly
useEffect(() => {
    if (!isPaused && milliseconds < goal && !editing) {
        var x = milliseconds;
        interval.current = setInterval(() => {
        x = x+10;
        setSeconds(x);
      }, 10);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused, stopped, milliseconds, goal, editing])


const addTime = () =>{
    setValue(goal+15000)
    setGoal(goal+15000)
}

const removeTime= () => {
    setValue(goal-15000)
    setGoal(goal-15000)
}

const stopTimer= () => {
    if(noControls){
        onStop()
    }
    clickPlayPause()
    setSeconds(0)

}

const resetTimer = () => {
    clickPlayPause();
    setSeconds(0)
    if(noControls){
        onReset();
    }
}

const skipToEnd = () => {
    setSeconds(value);
    setIsPaused(true);
    if(noControls){
        onSkip();
        setIsPaused(false)
    }
}

return(
    <div style={{display: 'inline-Flex'}}>
        <div className="timerCircle">
            <div className="goalText"><img src={clock} alt="clock"></img>{timeMath(goal).substring(0,8)}</div>
            <div className="timerText">{timer}
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

export default Stopwatch;
