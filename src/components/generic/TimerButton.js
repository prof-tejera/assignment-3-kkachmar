import "./TimerButton.css"

const TimerButton = ({img, text, onClick}) => {

if (img) {
  return(
    <div onClick={e => onClick()}>
      <img src={img} alt={img.toString()}></img>
    </div>
);
} else if (text) {
  return(
    <div className={text==="+" ? "timeCircleUp" : "timeCircleDown"} onClick={e => onClick()}>{text}</div>
);
} else {
  return;
}
  
  
  };
  
  export default TimerButton;
  