import React, { Component } from 'react';
import Title from './components/Title';
import Search_bar from './components/Search_bar';
import Weather from './components/Weather';
import localForage from 'localforage';
import { withRouter } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            weatherData: [],
            errormessage: '',
            savedCities: []
        };

        this.saveCity = this.saveCity.bind(this);
        
        this.initDB();

        /* Load items from database and populate the current state */
        localForage.iterate((cityDataFromDb, key, iterationNumber) => {
            let currentCities = _.cloneDeep(this.state.savedCities);
            currentCities.push(cityDataFromDb);
            this.setState({ savedCities: currentCities });
        }).then(() => {
            console.log('DB initial load has completed');
        }).catch((err) => {
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
  
    render (){
        return(
            <div>
                <Title />
                <Search_bar saveCity={this.saveCity} />
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
export default withRouter(App)