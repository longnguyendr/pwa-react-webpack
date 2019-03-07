import React, { Component } from 'react';
import Title from './components/Title';
import Search_bar from './components/Search_bar';
import Weather from './components/Weather';
import styles from './components/Suggestion.css';
import localForage from 'localforage';
import axios from 'axios';
import * as _ from 'lodash';
const apiKey = require('../apiKey.json');
const cityData = require('../www/citylist/citylist.json');

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
            weatherData: [],
            cityInput: '',
            cityId: '',
            submit: '',
            errormessage: '',
            dropdown: "",
            savedCities: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.handleClick = this.handleClick.bind(this);

        
        this.initDB();

        /* Load items from database and populate the current state */
        localForage.iterate((cityDataFromDb, key, iterationNumber) => {
            let currentCities = _.cloneDeep(this.state.savedCities);
            currentCities.push(cityDataFromDb);
            this.setState({ savedCities: currentCities });
        }).then(function() {
            console.log('DB initial load has completed');
        }).catch(function(err) {
            console.log(err);
        });
      }

      saveCity(cityAndWeatherData)
      {
          console.log(cityAndWeatherData)
          let savedCities = [];
          if(this.state.savedCities.find(element => element.id === cityAndWeatherData.id) == undefined)
          {
              console.log(cityAndWeatherData.id);
              savedCities = _.cloneDeep(this.state.savedCities);            
              savedCities.unshift(cityAndWeatherData);
              localForage.setItem(cityAndWeatherData.id.toString(), cityAndWeatherData)
              .then(() => {
                  console.log("item added to database")
                })
                .catch( (err) => {
                  // we got an error
                  console.log("db error");
                });
              this.setState({ savedCities });
          }
          else
          {        
              return;
          }        
          console.log(this.state.savedCities)
      }
  
      initDB()
      {
          localForage.config({
              driver      : localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
              name        : 'weatherAppForage',
              version     : 1.0,
              storeName   : 'dataStorage', // Should be alphanumeric, with underscores.
              description : 'some description'
          });
          console.log("Database init complete");
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
            let cityInput = this.state.cityInput.toLowerCase().trim();
            // cityOutput = cityData.filter(i => i.name.trim().toLowerCase().startsWith(this.state.cityInput.toLowerCase().trim())); // change code here
            
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
    // Suggestion when user click dropdown
    handleClick = (i) => {
        // console.log();
        this.setState({
            dropdown: "dropdown-close",
            cityInput: i.target.getAttribute('name'),
            cityId: i.target.id
        });
    }

    // get weather on submit button
    getWeather = async (e) => {
        e.preventDefault();
        if(this.state.cityInput != null)
        {
            return new Promise((resolve, reject) => {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${this.state.cityId}&APPID=${apiKey.openWeatherKey}&units=metric`)
                     .then( (response) => {
                         // handle success
                         console.log(response);
                         console.log(response.data);
                         console.log(response.data.sys.country);
                         this.saveCity(response.data)
                         this.setState({
                            weatherData: _.values({data: response.data}),
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
    render (){
        // console.log(this.state.data);
        console.log(this.state.weatherData.map(i => i.id));
        const data = this.state.data.map((i) => <li key={i.id} className={this.state.dropdown} onClick={this.handleClick} id={i.id} name={i.name}> {i.name}, {i.country}</li>)
        return(
            <div>
                <Title />
                <Search_bar 
                    getWeather={this.getWeather} 
                    handleChange={this.handleChange} 
                    value={this.state.cityInput}
                />
              
                <div>
                    <ul> 
                        {data} 
                    </ul>
                </div>  
                <div>
                    {
                        this.state.savedCities.map(city => {
                            return <Weather key={city.id} data={city} />
                        })
                    }
                </div>
                {/* <div>
                    {
                        this.state.weatherData.map(city => {
                            return <Weather key={city.id} data={city} />
                        })
                    }
                </div> */}
               
            </div>            
        );
    }
}
export default App