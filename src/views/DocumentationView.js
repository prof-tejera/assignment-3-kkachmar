import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";
import Controls from "../components/generic/Controls";

import TimerButton from "../components/generic/TimerButton";
import Setting from "../components/generic/Setting";
import Stopwatch from "./../components/timers/Stopwatch"
import Tabata from "../components/timers/Tabata";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import InputField from "../components/generic/InputField";
import Button from "../components/generic/Button";




const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const doNothing = () => {
  return;
}

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Controls "
          component={<Controls></Controls>}
          propDocs={[
            {
              prop: "resetAction",
              description: "Function to be executed when the reset button is clicked",
              type: "Function",
              defaultValue: "none",
            },
            {
              prop: "pauseAction",
              description: "Function to be executed when the pause button is clicked",
              type: "Function",
              defaultValue: "none",
            },
            {
              prop: "stopAction",
              description: "Function to be executed when the stop button is clicked",
              type: "Function",
              defaultValue: "none",
            },
            {
              prop: "skipAction",
              description: "Function to be executed when the fast forward button is clicked",
              type: "Function",
              defaultValue: "none",
            },
            {
              prop: "isPaused",
              description: "Allows the controls to recognize if the timer is paused, helps toggle play/pause button",
              type: "Boolean",
              defaultValue: "true",
            }
          ]}
        />
        <DocumentComponent
          title="Timer Button"
          component={<TimerButton text="-"></TimerButton>}
          propDocs={[
            {
              prop: "img",
              description: "Image url display in the button",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "text",
              description: "Text to show on the button",
              type: "String",
              defaultValue: "none",
            },
            {
              prop: "onClick",
              description: "Function to be executed when the button is clicked",
              type: "Function",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Setting"
          component={<Setting label="Sets:" val={3}></Setting>}
          propDocs={[
            {
              prop: "label",
              description: "Label for the value this helps the user edit",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "val",
              description: "Value being edited",
              type: "String",
              defaultValue: "none",
            },
            {
              prop: "up",
              description: "Function to be executed when the + button is clicked",
              type: "Function",
              defaultValue: "none",
            },
            {
              prop: "down",
              description: "Function to be executed when the - button is clicked",
              type: "Function",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Input Field"
          component={<InputField textType="title" val={"text field"} onChange={(e)=>doNothing()}></InputField>}
          propDocs={[
            {
              prop: "val",
              description: "Text field value",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "textType",
              description: "Specifies the CSS class for the text style",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "large",
              description: "Specifies the CSS class for the text size",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "onChange",
              description: "Function to be executed when the text field changes",
              type: "Function",
              defaultValue: "none",
            },
          ]}
        />
      </div>
      <DocumentComponent
          title="Stopwatch"
          component={<Stopwatch></Stopwatch>}
          propDocs={[
            {
              prop: "time",
              description: "Current time of the stopwatch",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "autoplay",
              description: "Starts timer automatically on render",
              type: "boolean",
              defaultValue: "none",
            },
            {
              prop: "onPause",
              description: "Action to be performed by parent when the timer is paused",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onReset",
              description: "Action to be performed by parent when the timer is reset",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onStop",
              description: "Action to be performed by parent when the timer is stopped",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onSkip",
              description: "Action to be performed by parent when the timer fast-forwards",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "noControls",
              description: "Tells timer not to display its time controls",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
      <DocumentComponent
          title="Countdown"
          component={<Countdown></Countdown>}
          propDocs={[
            {
              prop: "time",
              description: "Current time of the stopwatch",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "autoplay",
              description: "Starts timer automatically on render",
              type: "boolean",
              defaultValue: "none",
            },
            {
              prop: "onPause",
              description: "Action to be performed by parent when the timer is paused",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onReset",
              description: "Action to be performed by parent when the timer is reset",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onStop",
              description: "Action to be performed by parent when the timer is stopped",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onSkip",
              description: "Action to be performed by parent when the timer fast-forwards",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "noControls",
              description: "Tells timer not to display its time controls",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="XY"
          component={<XY></XY>}
          propDocs={[
            {
              prop: "time",
              description: "Current time of the stopwatch",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "setNumber",
              description: "Number of the sets for the timer",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "autoplay",
              description: "Starts timer automatically on render",
              type: "boolean",
              defaultValue: "none",
            },
            {
              prop: "onPause",
              description: "Action to be performed by parent when the timer is paused",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onReset",
              description: "Action to be performed by parent when the timer is reset",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onStop",
              description: "Action to be performed by parent when the timer is stopped",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onSkip",
              description: "Action to be performed by parent when the timer fast-forwards",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "noControls",
              description: "Tells timer not to display its time controls",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="Tabata"
          component={<Tabata></Tabata>}
          propDocs={[
            {
              prop: "time",
              description: "Duration of the work time for the timer",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "restTime",
              description: "Duration of the rest time for the timer",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "setNumber",
              description: "Number of the sets for the timer",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "autoplay",
              description: "Starts timer automatically on render",
              type: "boolean",
              defaultValue: "none",
            },
            {
              prop: "onPause",
              description: "Action to be performed by parent when the timer is paused",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onReset",
              description: "Action to be performed by parent when the timer is reset",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onStop",
              description: "Action to be performed by parent when the timer is stopped",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "onSkip",
              description: "Action to be performed by parent when the timer fast-forwards",
              type: "function",
              defaultValue: "none",
            },
            {
              prop: "noControls",
              description: "Tells timer not to display its time controls",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="Button"
          component={<Button color="pink" text="Button" onClick={e=>doNothing()}></Button>}
          propDocs={[
            {
              prop: "text",
              description: "Text displayed on the button",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "color",
              description: "Color of the button",
              type: "string",
              defaultValue: "blue",
            },
            {
              prop: "onClick",
              description: "Function to call when button is clicked",
              type: "function",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Controls"
          component={<TimerButton text="-"></TimerButton>}
          propDocs={[
            {
              prop: "text",
              description: "Text displayed on the button",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "color",
              description: "Color of the button",
              type: "string",
              defaultValue: "blue",
            },
            {
              prop: "onClick",
              description: "Function to call when button is clicked",
              type: "function",
              defaultValue: "none",
            },
          ]}
        />
    </Container>
  );
};

export default Documentation;
