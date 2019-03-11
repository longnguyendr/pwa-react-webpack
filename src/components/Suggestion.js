import React, { Component } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import styles from '../components/Suggestion.css';



export default class Suggestion extends Component {
    constructor(props) {
        super(props);
      }
    render () {
        // console.log("suggestion");
        // console.log(this.props.data);
        const data = this.props.data.map((i) => <li key={i.id} className={this.props.dropdown} onClick={this.props.handleClick} id={i.id} name={i.name}> {i.name}, {i.country}</li>)
        return(
            <div className="dropdown-content">
                <ul >{data}</ul>
            </div>
        )
    }
}
