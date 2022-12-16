import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

import TimerButton from "../components/generic/TimerButton";
import Button from "../components/generic/Button";
import { useNavigate, useParams } from "react-router-dom";

import pencil from "./../assets/pencil.png"
import checkmark from "./../assets/checkmark.png"
import { usePersistedState } from "./../utils/hooks"
import { timeMath, makeTimes, makeSets, updateUrl } from "../utils/helpers";




const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const WorkoutView = () => {
  const state = JSON.parse(window.localStorage.getItem('runningState'));
  //(state)

  const workoutData = (useParams());
  const [needRefresh, setNeedRefresh] = useState(false);
  const [index, setIndex] = useState(state?state.index:0);


  //let workoutData = useParams();
  const [workouts, setWorkouts] = useState(JSON.parse(atob(workoutData.workoutId)))
  const interval = useRef(null);

  const getTimerDuration = useCallback(() => {
    return (parseInt(workouts[index].work) + parseInt(workouts[index].rest)) * parseInt(workouts[index].sets)
  }, [index, workouts])

  const getTimeRemaining = useCallback((index) => {
    let total = 0
    for(let i=index; i<workouts.length; i++){
      total += (parseInt(workouts[i].work)+ parseInt(workouts[i].rest)) * parseInt(workouts[i].sets)
    }
    return total;
  },[workouts])

  var totalTime = getTimerDuration();

  // eslint-disable-next-line
  const [runningState, setRunningState] = usePersistedState('runningState', undefined);
  
  const [milliseconds, setSeconds] = useState(state?state.ms:totalTime);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [workoutEnd, setWorkoutEnd] = useState(false);
  const [remaining, setTimeRemaining] = useState(state?state.remaining:getTimeRemaining(0));
  const [editing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [workValue, setWorkValue] = useState(0);
  const [restValue, setRestValue] = useState(0);
  const [setsValue, setSetsValue] = useState(1);

  const writeRunningState =useCallback( () => {
    setRunningState({ms: milliseconds, remaining: remaining, index: index});
  },[index, milliseconds, remaining, setRunningState])

  const [descriptionValue, setDescriptionValue] = useState("");
  const [indexValue, setIndexValue] = useState(0);
  const [workoutStart, setStart] = useState(true);
  const [orderEdited, wasOrderEdited] = useState(false);

  const getValues = () => {
      setTitleValue(workouts[index].title);
      setDescriptionValue(workouts[index].description);
      setIndexValue(index);
      if(workouts[index].work){
        setWorkValue(workouts[index].work)
      }
      if(workouts[index].rest){
        setRestValue(workouts[index].rest)
      }
      if(workouts[index].sets){
        setSetsValue(workouts[index].sets)
      }
  }


  if(workoutStart) {
    getValues();
    setStart(false)
  }
  
  
  let navigate = useNavigate();

  const disableControls = true;


  const [history, setHistory] = usePersistedState('history', []);


  const writeToHistory = useCallback(() => {
    let x = (JSON.parse(window.localStorage.getItem('history')))
    if (!x){
      x = []
    }

    if(history){
      const historyArr = history;
      let newWorkout = true;
      historyArr.forEach(y => {
        if(y.workoutId === workoutData.workoutId){
          newWorkout = false;
          return;
        }
      })
      if(newWorkout){
        x.push(workoutData);
      }
    }

    setHistory(x);
  // eslint-disable-next-line
  },[])

  const pauseTime = () => {
    setIsPaused(!isPaused)
    if(index === 0){
      setAutoplay(true)
    }
  }

  const resetTime = () => {
    setSeconds(getTimerDuration)
    setTimeRemaining(getTimeRemaining(index))
  }

  const nextTimer = useCallback(() => {

    setIsPaused(true)
    if(index < workouts.length -1){
      setIndex(index+1);
      setSeconds(getTimerDuration)
      setTimeRemaining(getTimeRemaining(index+1))
      setAutoplay(true)
      setIsPaused(false)
    } else {
      setWorkoutEnd(true);
      setAutoplay(false)
      setIsPaused(true)
      setTimeRemaining(0)
      setRunningState(undefined)
    }
  }, [getTimerDuration, workouts.length, getTimeRemaining, index, setRunningState])

  function stopWorkout() {
    setIsPaused(true)
    setAutoplay(false)
    setIndex(0);
    setSeconds(getTimerDuration())
    setTimeRemaining(0)
  }

  useEffect(() => {
    if (milliseconds > -1 && !isPaused) {
        var x = milliseconds;
        var y = remaining;
      interval.current = setInterval(() => {
        x = x-10;
        y = y-10
        setSeconds(x);
        setTimeRemaining(y);
        if(x%2500===0){
          writeRunningState();
        } else if (x <= 12){
          setRunningState(undefined)
        }
      }, 10);
    } else if (milliseconds > -1 && isPaused){
      //setAutoplay(true);
    }else {
      clearInterval(interval.current);
      interval.current = null;
      if(index < workouts.length-1){
        nextTimer();
      } else {
        setWorkoutEnd(true)
      }
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [milliseconds, isPaused, index, nextTimer, workouts.length, remaining, setRunningState, writeRunningState])

  const newWorkout = () => {
    navigate("/add");
  }

  useEffect(() => {
    if(workoutEnd){
      writeToHistory()
    }
  }, [workoutEnd, writeToHistory])

  const toHistory = () => {
    navigate("/history");
  }

  const toggleEditing = () =>{
    if(!editing){
      setEditing(true);
      setIsPaused(true)
    }else {
      setEditing(false);
      setIsPaused(false)
      setNeedRefresh(true);
    }

  }
  


  useEffect(() => {
    if(!workoutStart){
      workouts[index].title = titleValue;
      workouts[index].description = descriptionValue;
      workouts[index].rest = restValue;
      workouts[index].work = workValue;
      workouts[index].sets = setsValue;
      if(orderEdited){
        let newWorkouts = changeOrder(index, indexValue-1, workouts)
        setWorkouts(newWorkouts)
      }
      getValues();
      // UPDATE URL
      if(needRefresh){
        setNeedRefresh(false)
        setRunningState(undefined)
        const urlArray = workouts;
        const encoded = updateUrl(urlArray)
        let address = "/workout/"+encoded
        navigate(address);
      }

    }
  // eslint-disable-next-line
  },[editing])

  function changeOrder(currentIndex, newIndex, timerArray) {
    var myTimer = [...timerArray];
    if(timerArray.length === 1){
      return;
    } else if (timerArray.length === 2){
      if(currentIndex !== newIndex) {
       return myTimer.reverse()
      } else {
        return;
      }
    } else {
      let x = 0;
      while(x<timerArray.length){
        if(x === currentIndex){
          timerArray[x].timerId = newIndex
        } else if(x === newIndex){
          timerArray[x].timerId = currentIndex
        } else {
          timerArray[x].timerId = x;
        }
        x++;
      }
      let newArray = [];
      let i = 0;
      while(i<timerArray.length){
        let j = i;
        timerArray.forEach(x=> {
          if(j === (x.timerId)) {
            newArray.push(x)
          }
        })
        i++;
      }
      return newArray;
    }
  }

  const getTitle = (editing) => {
    if(!editing){
      return(<h1 className='displayText left-align no-bottom-margin'>{titleValue}</h1>);
    } else {
      return(<input className='displayText left-align small-margin' value={titleValue} onChange={(e)=> setTitleValue(e.target.value)}></input>);
    }
  }

  function indexVal(e) {
    setIndexValue(e.target.value)
    wasOrderEdited(true)
  }

  const getDescription = (editing) => {
    if(!editing){
      return(<h2 className='subtitle small-margin'>{descriptionValue}</h2>);
    } else {
      return(<input className='subtitle input small-margin' value={descriptionValue} onChange={(e)=> setDescriptionValue(e.target.value)}></input>);
    }
  }

  function makeIndexList() {
    var options = []
    var x = 1;
    while (x <= workouts.length) {
      options.push({index: x, display: x+"/"+workouts.length});
      x++;
    }
    return options;
  }

  const getIndex = (editing) => {
    if(!editing){
      return(<div><span className="pinkText">Timer:</span> {index+1}/{workouts.length}</div>);
    } else {
      return(
        <div>
        <div><span className="pinkText">Current Index:</span> {index+1}/{workouts.length}</div>
        <div> <span className="pinkText">New Index:</span>
          <select className="input small small-margin no-bottom-margin" id={`index-${workouts[index].timerId}`} onChange={(e)=>indexVal(e)}>
              {makeIndexList().map((x) => 
                <option value={x.index} key={x.index}>{x.display}</option>
              )}
          </select>
        </div>
        </div>
      );
    }
  }

  const getWork = (editing) => {
    if(!editing){
      return(<div><span className="pinkText">Work:</span> {timeMath(workValue).substring(0,8)}</div>);
    } else {
      return(
        <div><span className="pinkText">Work:</span>
          <select className="input small small-margin no-bottom-margin " id={`index-${workouts[index].timerId}`} onChange={(e)=>setWorkValue(e.target.value)}>
            {makeTimes().map((time) => 
                  <option value={time.ms} key={time.ms}>{time.display}</option>
              )}
          </select>
        </div>
      );
    }
  }

  const getRest = (editing) => {
    if(!editing){
      return(<div><span className="pinkText">Rest:</span> {timeMath(restValue).substring(0,8)}</div>);
    } else {
      return(
        <div><span className="pinkText">Rest:</span>
          <select className="input small small-margin no-bottom-margin " id={`index-${workouts[index].timerId}`} onChange={(e)=>setRestValue(e.target.value)}>
            {makeTimes().map((time) => 
                  <option value={time.ms} key={time.ms}>{time.display}</option>
              )}
          </select>
        </div>
      );
    }
  }

  const getSets = (editing) => {
    if(!editing){
      return(<div><span className="pinkText">Sets:</span> {setsValue}</div>);
    } else {
      return(
        <div><span className="pinkText">Sets:</span>
          <select className="input small small-margin no-bottom-margin " id={`index-${workouts[index].timerId}`} onChange={(e)=>setSetsValue(e.target.value)}>
            {makeSets().map((x) => 
                  <option value={x.sets} key={x.sets}>{x.display}</option>
              )}
          </select>
        </div>
      );
    }
  }

  function getTimer(info){
    switch (info.timerType){
      case("stopwatch"):
        return (<Stopwatch state={state} time={info.work} autoplay={autoplay} editing={editing} onPause={pauseTime} onReset={resetTime} onStop={stopWorkout} onSkip={nextTimer} noControls={disableControls}></Stopwatch>);
      case("countdown"):
        return (<Countdown state={state} time={info.work} autoplay={autoplay} editing={editing} onPause={pauseTime} onReset={resetTime} onStop={stopWorkout} onSkip={nextTimer} noControls={disableControls}></Countdown>);
      case("xy"):
        return(<XY time={info.work} setNumber={info.sets} autoplay={autoplay} editing={editing} onPause={pauseTime} onReset={resetTime} onStop={stopWorkout} onSkip={nextTimer} noControls={disableControls}></XY>);
      case("tabata"):
        return(<Tabata state={state} time={info.work} restTime={info.rest} setNumber={info.sets} autoplay={autoplay} editing={editing} onPause={pauseTime} onReset={resetTime} onStop={stopWorkout} onSkip={nextTimer} noControls={disableControls}></Tabata>);
      default:
        return;
    }
  }

  // move through index of list
      
  if (workouts.length>0 && !workoutEnd){
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", marginLeft: '-7vw'}}>
        <div className="container">
          <div className="pageHeader bottom-border titleLine">
              <div>
                {getTitle(editing)}
                {getDescription(editing)}
              </div>
            <h2 className="displayText-small">{timeMath(remaining).slice(0,8)}</h2>
          </div>
          <div>
            <div className="small-margin timer-information">
              <div>
                {getIndex(editing)}
                {getWork(editing)}
                {workouts[index].timerType==="tabata"?getRest(editing):""}
                { workouts[index].timerType==="tabata"||workouts[index].timerType==="xy"?getSets(editing):"" }
              </div>
              <TimerButton img={editing?checkmark:pencil} onClick={e=>toggleEditing()} style={{display: 'flex', float: 'right'}}></TimerButton>
            </div>
              <Timers>
                <div style={{display: 'flex', textAlign: 'left'}}>
                  {getTimer(workouts[index])}
                </div>
              </Timers>
          </div>
        </div>
      </div>

    );
  } else if (workouts.length>0 && workoutEnd) {
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", marginLeft: '-7vw'}}>
        <div className="container">
          <div className="pageHeader bottom-border titleLine">
          <div className='greenBorderText'>
                Workout Complete
            </div>
            <h2 className="displayText-small">{timeMath(remaining).slice(0,8)}</h2>
          </div>
          <div>
            <br></br>
            <h2 style={{textAlign: 'center'}}>You completed a workout. Great job!</h2>
            <br></br>
            <br></br>
            <br></br>
            <div className="pageHeader center-align">
              <Button color="green" text="New" onClick={e=>newWorkout()}></Button>
              <Button color="pink" text="History" onClick={e=>toHistory()}></Button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (<h2>No workout created</h2>);
  }
};

export default WorkoutView;
