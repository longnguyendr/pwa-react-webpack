import React, { Component } from 'react';

class Search_bar extends Component {
    constructor(props) {
        super(props);
      }
    render () {
        return(
            <div>
                <form  onSubmit={this.props.getWeather}>
                    <input 
                        type="text"
                        placeholder="Enter city" 
                        name="city" 
                        value={this.props.value} 
                        onChange={this.props.handleChange} 
                    ></input>
                    <button >Add city</button>
                </form>
            </div>
        )
    }
}

export default Search_bar