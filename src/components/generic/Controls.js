//https://stackoverflow.com/questions/34582405/react-wont-load-local-images
import restart from "./../../assets/restart.png"
import pause from "./../../assets/pause.png"
import play from "./../../assets/play.png"
import stop from "./../../assets/stop.png"
import fastForward from "./../../assets/fast-forward.png"

import TimerButton from "../generic/TimerButton";

const Controls = ({resetAction, pauseAction, stopAction, skipAction, isPaused}) => {

return(
    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
        <TimerButton img={restart} onClick={e=>resetAction()}></TimerButton>
        <TimerButton img={isPaused ? play: pause} onClick={pauseAction}></TimerButton>
        <TimerButton img={stop} onClick={stopAction}></TimerButton>
        <TimerButton img={fastForward} onClick={skipAction}></TimerButton>
     </div>
);

}

export default Controls;