import { timeMath } from "../utils/helpers";


const HistoryView = () => {


  const storedHistory = JSON.parse(window.localStorage.getItem('history'));
  let history = []
  storedHistory.forEach(x => {
    let y = atob(x.workoutId)
    history.push(JSON.parse(y))
  })


  const makeSummary = () => {
    let completeSummary = []
    history.forEach(workout => {
      const timers = workout.length;
      const date = workout[0].date
      let types = ""
      let totalTime = 0
      
      workout.forEach(timer => {
        //timer types
        types += (timer.title+": "+timer.timerType)
        if(timer.timerId !== workout.length-1){
          types += ", "
        }
        //duration
        totalTime += (parseInt(timer.work)+parseInt(timer.rest) * parseInt(timer.sets))
      })
      let workoutSummary = {
        dateCreated: date.slice(0,date.indexOf("T")),
        totalTimers: timers,
        timerTypes: types,
        duration: totalTime
      }
      completeSummary.push(workoutSummary)
    })
    return completeSummary;
  }


  let summary = makeSummary()

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", marginLeft: '-7vw'}}>
          <div className="container">
            <div className="pageHeader">
              <h1>Past Workouts</h1>
            </div>
            <div className="full-width-scroll outline column" >
              {summary.map(workout => (
                <div>
                  <div key={workout.date}>
                    <h4 className="pinkText small-bottom-margin">{workout.dateCreated}</h4>
                    <h2 className={workout.totalTimers===1?"hidden greenText no-top-margin small-bottom-margin":"greenText no-top-margin small-bottom-margin"}>{workout.totalTimers} Timers, Total Time: {timeMath(workout.duration).slice(0,8)}</h2>
                    <h2 className={workout.totalTimers!==1?"hidden greenText no-top-margin small-bottom-margin":"greenText no-top-margin small-bottom-margin"}>{workout.totalTimers} Timer, Total Time: {timeMath(workout.duration).slice(0,8)}</h2>
                    <h3 className="no-top-margin">{workout.timerTypes}</h3>
                  </div>
                  <div className="bottom-border"></div>
                </div>
              ))}
            </div>
          </div>
      </div>
    );

};

export default HistoryView;
