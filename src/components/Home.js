import React, { Component } from 'react';
import { Link } from 'react-router';

import avgRates from '../utils/avgRates.js';
import fetcher from '../utils/fetcher.js';
import formatDate from '../utils/formatDate.js';

import './Home.css';
import './ShowcaseDetail.css';

class Home extends Component {
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

  getFormatDate(date) {
    return formatDate(date);
  }

  render() {
    let reviews = this.state.data.reviews;
    return (   
      <div className="home">
        <h1>Welcome to State of React.</h1>
        <p>
          A showcase of frameworks, utils, tests & everything related to React!<br/>Rate and review your favorites.
        </p>
        <small>Here's one picked randomnly :)</small>
        <div className="detail">
          <h2><Link to={'/'+this.state.data.id}>{this.state.data.name}</Link></h2>
            <small>{this.getFormatDate(this.state.data.created_at)}</small>
            <p>
              {this.state.data.body}<br/>
              Reviews: {(reviews)?reviews.length:''} - Avg. rate: { (reviews)?this.getAvgRates(reviews):''}              
            </p>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  fetchUrl: React.PropTypes.string
}

// Give some defaults
Home.defaultProps = {
  fetchUrl: 'api/rnd'  // we use a proxy + the express.js server to resolve the correct .json path
}

export default Home;
