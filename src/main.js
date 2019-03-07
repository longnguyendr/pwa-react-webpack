import React from 'react';
import ReactDom from 'react-dom';
import App from './App';



// if(data.city.name == "Altstadt")
// var getWeather = data.city.id;
// console.log(getWeather);

const reactTarget = document.getElementById('react-target');

ReactDom.render(<App />, reactTarget);

console.log("it work!!");