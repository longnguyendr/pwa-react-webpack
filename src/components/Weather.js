import React, { Component } from 'react';
let moment = require('moment');
import '../components/Weather.css';

class Weather extends Component {
    render () {
        const time = moment.unix(this.props.data.dt).format('ddd D.M.YYYY HH:mm:ss');
        const sunrise = moment.unix(this.props.data.sys.sunrise).format('HH:mm');
        const sunset = moment.unix(this.props.data.sys.sunset).format('HH:mm');
console.log(this.props.data);
        return this.props.data == null ? null :
            (
                <div className="main">
                    <div className="marginBox">
                        <div>{this.props.data.name}, {this.props.data.sys.country}</div>
                        <div className="mainTemp">{this.props.data.main.temp} &#8451;</div>
                        <div>{this.props.data.main.temp_min} &#8451;/{this.props.data.main.temp_max} &#8451;</div>
                        <div>{time}</div>
                        <div>sunrise: {sunrise} , sunset: {sunset}</div>
                    </div>                    
                </div>
            );
    }
}

export default Weather