import React, { Component } from 'react';
import {withRouter ,Link } from 'react-router-dom';
import '../components/Weather_detail.css';
import Nav from './Nav';
let moment = require('moment');

class Weather_detail extends Component {
    constructor(props) {
        super(props);
        
        this.state=({
            test: ''
        });
        // this.navigateToHome = this.navigateToHome.bind(this);
      }
    // navigateToHome() {
      
    //     this.setState({
    //         test: 'click work ok!!'
    //     })
    //   }
    render () {
        
        console.log(this.props);
        console.log(this.props.location.state);
        const datas = this.props.location.state.weather_detail;
        const time = moment.unix(datas.dt).format('ddd D.M.YYYY HH:mm:ss');
        const sunrise = moment.unix(datas.sys.sunrise).format('HH:mm');
        const sunset = moment.unix(datas.sys.sunset).format('HH:mm');
        const forecast = datas.weather.map(res => <div key={res.id}>{res.description}</div>)
        return datas == null ? null : 
        (
           <div>
                <Nav onLocation={true} location={this.props.location} history={this.props.history}/>
                <div className="main"  key={datas.id}>
                <div className="marginBox">
                        <div>
                            <div>{datas.name}, {datas.sys.country}</div>
                            <div className="mainTemp">{datas.main.temp} &#8451;</div>
                            <div>{datas.main.temp_min} &#8451;/{datas.main.temp_max} &#8451;</div>
                            <div>{time}</div>
                            <div>sunrise: {sunrise} , sunset: {sunset}</div>
                            <div> {forecast}</div>
                        </div>
                    </div>                    
                </div>
           </div>
           
        );
    }
}

export default Weather_detail