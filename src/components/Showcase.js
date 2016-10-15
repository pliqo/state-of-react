import React, { Component } from 'react';
import { Link } from 'react-router'

import avgRates from '../utils/avgRates.js';
import fetcher from '../utils/fetcher.js';

import './Showcase.css';

class Showcase extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  fetchData() {
    const url = this.props.fetchUrl;
    fetcher(url, (data) => {
      this.setState({ 
        data: data
      }); 
    });  
  }

  componentDidMount() {
    this.fetchData();
  }

  getAvgRates(reviews) {
    return avgRates(reviews);
  }

  render() {
    return ( 
        <div className="showcase">  
          <h3>Showcase</h3>
          <ul className="list">
          {this.state.data.map((item, index) =>
            <li key={index} className="list_item">
            <h2><Link to={"/"+item.id}>{item.name}</Link></h2>
            <p>
              {item.body}<br/>
              Reviews: {item.reviews.length} - Avg. rate: { this.getAvgRates(item.reviews) }            
            </p>
            </li>
          )}
          </ul>
        </div>
    );
  }
}

Showcase.propTypes = {
  fetchUrl: React.PropTypes.string
}

// Give some defaults
Showcase.defaultProps = {
  fetchUrl: 'api/showcase' // we use a proxy + the express.js server to resolve the correct .json path
}

export default Showcase;
