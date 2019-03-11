import React, { Component } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import Suggestion from './Suggestion.js';
import styles from './Search_bar.css';
const apiKey = require('../../apiKey.json');
const cityData = require('../../www/citylist/citylist.json');


class Search_bar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            cityInput: '',
            cityId: '',
            dropdown: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.handleClick = this.handleClick.bind(this);
       
      }
    // set delay times
    delayTime = async (ms) => {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
    };
       //Input on change event
    handleChange = async (e) => {
        this.setState({
          cityInput: e.target.value
        });
        
        if(this.state.cityInput != null){
            this.setState({dropdown: 'dropdown-open'});
            await this.delayTime(800);
            let cityOutput;
            let cityInputLength = this.state.cityInput.length;
            let cityInput = this.state.cityInput.trim().toLowerCase();
            
            cityOutput = cityData.filter(i => {
                if(i.name.trim().toLowerCase().startsWith(cityInput)) {
                    if(i.name.length === cityInputLength)
                    {
                        return i.name.trim().toLowerCase() === (cityInput); 
                    }
                    else if (i.name.length > cityInputLength) {
                        return i.name.trim().toLowerCase().slice(0, cityInputLength) === (cityInput); 
                    }
                }
            }); 
            cityOutput = (cityOutput.length === 0) ? [] : cityOutput.slice(0,10);
            let results = (this.state.cityInput.length > 0) ? this.setState({data: cityOutput}) : this.setState({data:[]});
            // console.log(this.state.data);
            return results
        }
    }
      // get weather on submit button
      getWeather = async (e) => {
        e.preventDefault();
        if(this.state.cityInput != null) {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${this.state.cityId}&APPID=${apiKey.openWeatherKey}&units=metric`)
                     .then( (response) => {
                         // handle success
                        //  console.log(response);
                        //  console.log(response.data);
                        //  console.log(response.data.sys.country);
                         this.props.saveCity(response.data)
                         this.setState({
                            // weatherData: _.values({data: response.data}),
                            cityInput: ''
                         })
                     })
                     .catch( (error) => {
                         // handle error
                         console.log(error);
                         reject(error);
                     });     
            });
        }
    }
      // Suggestion when user click dropdown
      handleClick = (i) => {
        // console.log(i.target.getAttribute('name'));
        this.setState({
            dropdown: "dropdown-close",
            cityInput: i.target.getAttribute('name'),
            cityId: i.target.id
        });
    }
    render () {
        // console.log("search bar");
        // console.log(this.state.data);
        return(
            <div>
                <div >  
                  
                    <form className="dropdown" onSubmit={this.getWeather}>
            
                            <input 
                                type="text"
                                placeholder="Enter city" 
                                name="city" 
                                value={this.state.cityInput} 
                                onChange={this.handleChange} 
                                autoComplete="off">
                            </input>
                        
                        <button >Add city</button>
                   
                    <Suggestion 
                            cityInput={this.state.cityInput}
                            data={this.state.data}
                            handleClick={this.handleClick}
                            dropdown={this.state.dropdown}
                    />
                     </form>
                </div>
            </div>
        )
    }
}

export default Search_bar