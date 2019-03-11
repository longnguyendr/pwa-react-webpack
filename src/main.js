import React from 'react';
import ReactDom from 'react-dom';
import {
    HashRouter as Router, Route, Switch
  } from "react-router-dom";
import App from './App';
import Weather_detail from './components/Weather_detail';


const routing = (
    <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/weather_detail" render={props => <Weather_detail {...props} /> }/>
        </Switch>
    </Router>
  );

// if(data.city.name == "Altstadt")
// var getWeather = data.city.id;
// console.log(getWeather);

const reactTarget = document.getElementById('react-target');

ReactDom.render(routing, reactTarget);

console.log("it work!!");