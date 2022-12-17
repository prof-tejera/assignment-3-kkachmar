import "./Button.css"

const Button = ({text, color, onClick}) => {

if(color === "green") {
  return(
    <div className="textButton textButtonGreen" onClick={e => onClick()}>
      {text}
    </div>
  );
} else if (color === "pink") {
  return(
    <div className="textButton textButtonPink" onClick={e => onClick()}>
      {text}
    </div>
);
} else return;
  
  
};
  
export default Button;
  