import { useState, useEffect, useRef, useCallback } from 'react';
import Controls from "../generic/Controls";
import Setting from '../generic/Setting';
import {timeMath} from "../../utils/helpers"



const XY = ({time, setNumber, autoplay, onPause, onReset, onStop, onSkip, noControls, editing}) => {

const [isPaused, setIsPaused] = useState(!autoplay);
const [milliseconds, setSeconds] = useState(time ? time : 0);
const [value, setValue]  = useState(time ? time : 0)
const [timer, setTimer] = useState(timeMath(time ? time : 0))
const [goal, setGoal] = useState(time ? time : 0)
const interval = useRef(null);
const [sets, setSets] = useState(setNumber ? setNumber : 1)
const [completed, setCompleted] = useState(1)


const stopTimer= useCallback(() => {
    setIsPaused(true)
    setSeconds(0)
    setCompleted(1)
    if(noControls){
        onStop()
    }
}, [noControls, onStop])

useEffect( ()=>{
    setTimer(timeMath(milliseconds)) 
}, [milliseconds, isPaused, stopTimer])

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
    } else if (!isPaused && completed < sets && !editing) {
        setCompleted(completed+1)
        setSeconds(goal)
    } else if (!isPaused && completed === sets-1 && !editing){
        stopTimer();
    }
    else {
        clearInterval(interval.current);
        interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused, milliseconds, completed, goal, sets, stopTimer, editing])


const addTime = () =>{
    setValue(goal+15000)
    setGoal(goal+15000)
    setSeconds(milliseconds+15000)
}

const removeTime= () => {
    setValue(goal-15000)
    setGoal(goal-15000)
    setSeconds(milliseconds-15000)

}

const resetTimer = () => {
    clickPlayPause();
    setSeconds(value)
    setCompleted(1)
    if(noControls){
        onReset()
    }
}

const skipToEnd = () => {
    setSeconds(0);
    setCompleted(sets);
    setIsPaused(true);
    if (noControls){
        onSkip()
    }
}

const addSets = () => {
    setSets(sets+1)
}

const subtractSets = () => {
    if(sets>=1){
        setSets(sets-1)
    }
}

return(
    <div style={{display: 'inline-Flex'}}>
        <div className="timerSquare">
            <div className="goalText" style={noControls ? {display:'none'} : {display: 'flex', justifyContent: 'space-between', marginTop: 0, marginBottom: 20}}>
                <Setting label="" val={timeMath(goal).substring(0,8)} up={addTime} down={removeTime}></Setting>
                <Setting label="Sets:" val={sets} up={addSets} down={subtractSets}></Setting>
            </div>
            <div className='displayText'>
                {completed}/{sets}
            </div>
            <div className="timerText" style={{fontSize: 'calc(20px + 1.5vw)'}}>{timer}
                <Controls resetAction={resetTimer} pauseAction={clickPlayPause} stopAction={stopTimer} 
                skipAction={skipToEnd} isPaused={isPaused}></Controls>
            </div>
        </div>
    </div>
    
);

};

export default XY;
