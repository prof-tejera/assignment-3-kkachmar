import { useState, useEffect, useRef, useCallback } from 'react';
import Controls from "../generic/Controls";
import Setting from '../generic/Setting';
import {timeMath} from "../../utils/helpers"
import { usePersistedState } from '../../utils/hooks';


const Tabata = ({time, restTime, setNumber, autoplay, onPause, onReset, onStop, onSkip, noControls, editing, state}) => {
const timerState = JSON.parse(window.localStorage.getItem('tabataState'));

const [isPaused, setIsPaused] = useState(!autoplay);
const [milliseconds, setSeconds] = useState(state?state.ms:time ? time : 0);
const [value, setValue]  = useState(time ? time : 0)
const [timer, setTimer] = useState(timerState?timeMath(timerState.ms):timeMath(time ? time : 0))
const [goal, setGoal] = useState(time ? time : 0)
const [rest, setRest] = useState(restTime ? restTime : 0)
const interval = useRef(null);
const [sets, setSets] = useState(timerState?timerState.sets:setNumber ? setNumber : 1)
const [completed, setCompleted] = useState(timerState?timerState.completed:1)
const [workType, setWorkType] = useState(timerState?timerState.workType:"WORK")
// eslint-disable-next-line
const [tabataState, setTabataState] = usePersistedState('tabataState', undefined);

const writeTabataState = useCallback(() => {
    setTabataState({workType: workType, completed: completed, sets: sets, ms: milliseconds});
  }, [completed, milliseconds, setTabataState, sets, workType])

useEffect( ()=>{
    setTimer(timeMath(milliseconds)) 
}, [milliseconds, isPaused])



const clickPlayPause = () => {
    setIsPaused(!isPaused)
    if(noControls){
        onPause()
    }
}

const stopTimer = useCallback(() => {
    setIsPaused(true)
    setSeconds(0)
    setCompleted(1)
    setWorkType("WORK")
    if(noControls){
        onStop()
    }
}, [noControls, onStop])

useEffect(() => {
    if (!isPaused && milliseconds > -1 && !editing) {
        // timer is running
        var x = milliseconds;
      interval.current = setInterval(() => {
        x = x-10;
        setSeconds(x);
        if(x%2500===0) {
            writeTabataState();
        }
        if(x<=15 && completed<sets){
            setTabataState(undefined)
        }
      }, 10);
    } else if (!isPaused && completed < sets && !editing) {
        //timer ran out, but we have sets left
        //Check for set type
        if(workType==="WORK"){
            setWorkType("REST")
            setSeconds(rest)
        } else {
            setWorkType("WORK")
            setCompleted(completed+1)
            setSeconds(goal)
        }
    } else if (!isPaused && completed === sets-1 && !editing){
        // timer ran out, no sets left
        stopTimer();
    }
    else {
        clearInterval(interval.current);
        interval.current = null;
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused, milliseconds, rest, completed, goal, sets, workType, stopTimer, editing, setTabataState, writeTabataState])


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
    setWorkType("WORK")
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

const addRest = () => {
    setRest(rest+15000)
}

const subtractRest = () => {
    if(rest>=1){
        setRest(rest-15000)
    }
}

return(
    <div style={{display: 'inline-Flex'}}>
        <div className={noControls ? "timerSquare": "timerRectangle"}>
            <div className="goalText" style={noControls ? {display:'none'} : {display: 'flex', justifyContent: 'space-between', marginTop: 0, marginBottom: 20}}>
                <Setting label="Work:" val={timeMath(goal).substring(0,8)} up={addTime} down={removeTime}></Setting>
                <Setting label="Rest:" val={timeMath(rest).substring(0,8)} up={addRest} down={subtractRest}></Setting>
                <Setting label="Sets:" val={sets} up={addSets} down={subtractSets}></Setting>
            </div>
            <div className='displayText' style={{display: 'block'}}>
                <span style={{fontSize: 30}}> {completed}/{sets} </span>
                  {workType}
            </div>
            <div className="timerText" style={{fontSize: 'calc(20px + 1.5vw)'}}>{timer}
                <Controls resetAction={resetTimer} pauseAction={clickPlayPause} stopAction={stopTimer} 
                skipAction={skipToEnd} isPaused={isPaused}></Controls>
            </div>
        </div>
    </div>
    
);

};

export default Tabata;
