import { useState, useEffect } from 'react';

import "./InputField.css"
import "./../../App.css"

const InputField = ({val, textType, large, onChange, submit, id}) => {

  //https://stackoverflow.com/questions/66737465/how-to-change-text-in-text-area-with-react-hooks
  const [text, setText] = useState(val);

  useEffect(() => {
    onChange(id, text)
  // eslint-disable-next-line
  },[text, id])


  if(large === true){
    // https://www.w3schools.com/tags/tag_textarea.asp
    return(
      <textarea value={text} onChange={(e) => setText(e.target.value)} className={textType === "title" ? "title pinkText input large" : "subtitle input large"}/>
    );
  } else
  return(
    <input value={text} onChange={(e) => setText(e.target.value)} className={textType === "title" ? "title pinkText input" : "subtitle input"}></input>
  );
};
  
  export default InputField;
  