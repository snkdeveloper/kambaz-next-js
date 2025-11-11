"use client";
import ClickEvent from "./ClicEvent";
import Counter from "./Counter";
import PassingFunctions from "./PassingFunctions";
import BooleanStateVariables from "./BooleanStateVariables";
import PassingDataOnEvent from "./PassingDataOnEvent";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObhectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/";
import store from "./store";
import { Provider } from "react-redux";
export default function Lab4() {
  console.log('Welcome to Lab 4!');
function sayHello() {
  alert("Hello");
}
  return (
    <Provider store={store}>
    <div id="wd-lab4">
      <h1 style={{ color: 'red', textAlign: 'center' }}>Sachet Kanchugar &apos; Assignment 4</h1>
   
      <h2>Lab 4 </h2>
      {/* Add your Lab 4 components and content here */}
    <ClickEvent />
    <PassingDataOnEvent />
    <PassingFunctions  theFunction={sayHello}/>
   <Counter  />
   <BooleanStateVariables />
   <StringStateVariables />
    <DateStateVariable />
    <ObhectStateVariable />
    <ArrayStateVariable />
    <ParentStateComponent />
    <ReduxExamples />
   </div>
   </Provider>

  );
}
      