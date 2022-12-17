import React from "react";
import "./AddView.css";
import "./../components/generic/InputField.css"
import { useState, useEffect } from 'react';


import TimerButton from "../components/generic/TimerButton";
import close from "./../assets/close.png"
import InputField from "../components/generic/InputField";
import Button from "../components/generic/Button";
import {makeSets, makeTimes, updateUrl} from "../utils/helpers"
import { useNavigate } from "react-router-dom";



const AddView = () => {


  //activity, description, timer, duration, rest
  // eslint-disable-next-line
  const timers = [];
  const [timerArray, setTimerArray] = useState(timers);
  const [errorMessage, showErrorMessage] = useState(false);
  const [submission, setSubmit] = useState(false);


  // https://reactrouter.com/en/main/start/concepts#defining-routes
  let navigate = useNavigate();


  // https://stackoverflow.com/questions/63885737/react-hooks-state-update-one-step-behind-for-this-reason-my-changes-are-not-wor
  useEffect(() => {},[timerArray, timers])

  // https://stackoverflow.com/questions/71295765/on-removing-1-element-from-array-map-function-removes-only-last-element-in-reac
  // https://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property
  function deleteTimer(myId, timers){
   var myTimer = [...timers];
   myTimer = myTimer.filter(function(x) {
    return x.timerId !== myId;
   });
   timers = myTimer;
    setTimerArray(myTimer)
  }

  function addTimer(timers){
    var myTimer = [...timers];
    const index = myTimer.length-1;
    var newId = timers.length > 0 ? myTimer[index].timerId + 1 : 0;
    myTimer.push(
      {
        timerId: newId, 
        title: "Title", 
        description: "Description", 
        timerType: "stopwatch", 
        work: 15000, 
        rest: 0,
        sets: 1,
        date: new Date()
      }
    );
    timers = myTimer;
    setTimerArray(myTimer)
  }

  const submit = (timers) => {
    setSubmit(true)
    if(timers.length >0) {
      var myTimer = [...timers];
      timers = myTimer;

      const urlArray = timers;
      const encoded = updateUrl(urlArray)

      navigate("/workout/"+encoded);
    } else {
      showErrorMessage(true);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  // https://stackoverflow.com/questions/60751661/pass-input-data-from-child-to-parent-react-js#:~:text=The%20simplest%20way%20would%20be%20to%20pass%20a%20function%20from%20parent%20to%20child%3A
  const updateTitle = (myId, newValue) => {
    var myTimer = [...timerArray];
    const index = myTimer.findIndex(x=>x.timerId === myId);
    myTimer[index].title = newValue
    setTimerArray(myTimer)
  }

  const updateDescription = (myId, newValue) => {
    var myTimer = [...timerArray];
    const index = myTimer.findIndex(x=>x.timerId === myId);
    myTimer[index].description = newValue
    setTimerArray(myTimer)
  }

  const updateType = (myId, event) => {
    var myTimer = [...timerArray];
    const index = myTimer.findIndex(x=>x.timerId === myId);
    myTimer[index].timerType = event.target.value
    setTimerArray(myTimer)
  }

  const updateWork = (myId, event) => {
    var myTimer = [...timerArray];
    const index = myTimer.findIndex(x=>x.timerId === myId);
    myTimer[index].work = event.target.value
    setTimerArray(myTimer)
  }

  const updateRest = (myId, event) => {
    var myTimer = [...timerArray];
    const index = myTimer.findIndex(x=>x.timerId === myId);
    myTimer[index].rest = event.target.value
    setTimerArray(myTimer)
  }

  const updateSets = (myId, event) => {
    var myTimer = [...timerArray];
    const index = myTimer.findIndex(x=>x.timerId === myId);
    myTimer[index].sets = event.target.value
    setTimerArray(myTimer)
  }




  // https://www.w3schools.com/tags/tag_select.asp
  return (
    <div className="container">
      <div className="pageHeader">
        <h1>My Workout</h1>
        <Button color="pink" text="Add" onClick={e=>addTimer(timerArray)}></Button>
        <Button color="green" text="Submit" onClick={e=>submit(timerArray)}></Button>
      </div>
      <div style={!errorMessage?{display: 'none'}:{}}>
        <h2>To add a timer, click the add button above</h2>
        <Button color="green" text="OK" onClick={e=>showErrorMessage(false)}></Button>
      </div>
      <div className="timerScroll">
        {timerArray.map((timer) => (
          <div className="timerSquare spaced fixed-width" key={timer.timerId}>
            <div>
              <div className="titleLine">
                <InputField textType="title" val={timer.title} submit={submission} onChange={updateTitle} id={timer.timerId}></InputField>
                <TimerButton img={close} className="editButton" onClick={()=> deleteTimer(timer.timerId, timerArray)}></TimerButton>
              </div>
              <br></br>
              <InputField val={timer.description} submit={submission} onChange={updateDescription} id={timer.timerId}></InputField>
            </div>
            <div className="timerInfo">
            <select className="subtitle pinkText input" name="timerType" id={`timerSelect-${timer.timerId}`} onChange={(e)=>updateType(timer.timerId, e)}>
              <option value="stopwatch">Stopwatch</option>
              <option value="countdown">Countdown</option>
              <option value="xy">XY</option>
              <option value="tabata">Tabata</option>
            </select>
              <div style={{display: 'flex', marginTop: 10}}>
                <div>
                  Work <br></br>
                  <select className="input small" id={`work-${timer.timerId}`} onChange={(e)=>updateWork(timer.timerId, e)}>
                    {makeTimes().map((time) => 
                      <option value={time.ms} key={time.ms}>{time.display}</option>
                    )}
                  </select>
                </div>
                <div style={{marginLeft: 10}} className={timer.timerType === "tabata" ? "" : "hidden"}>
                  Rest <br></br>
                  <select className="input small" id={`rest-${timer.timerId}`} onChange={(e)=>updateRest(timer.timerId, e)}>
                    {makeTimes().map((time) => 
                      <option value={time.ms} key={time.ms}>{time.display}</option>
                    )}
                  </select>
                </div>
                <div style={{marginLeft: 10}} className={timer.timerType === "tabata" || timer.timerType === "xy" ?  "" : "hidden"}>
                  Sets <br></br>
                  <select className="input small" id={`sets-${timer.timerId}`} onChange={(e)=>updateSets(timer.timerId, e)}>
                    {makeSets().map((x) => 
                      <option value={x.sets} key={x.sets}>{x.display}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
)};

export default AddView;
