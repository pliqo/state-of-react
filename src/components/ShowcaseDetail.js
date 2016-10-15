import React, { Component } from 'react';

import avgRates from '../utils/avgRates.js';
import fetcher from '../utils/fetcher.js';

import './ShowcaseDetail.css';

class ShowcaseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      idx: this.props.params.id
    }
  }

  fetchData() {
    const url = this.props.fetchUrl+this.state.idx;
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
    let reviews = this.state.data.reviews;
    return (   
        <div className="detail">
          <h1>{this.state.data.name}</h1>
            <p>
              {this.state.data.body}<br/>
              Reviews: {(reviews)?reviews.length:''} - Avg. rate: { (reviews)?this.getAvgRates(reviews):''}              
            </p>
        </div>
    );
  }
}

ShowcaseDetail.propTypes = {
  fetchUrl: React.PropTypes.string
}

// Give some defaults
ShowcaseDetail.defaultProps = {
  fetchUrl: 'api/'  // we use a proxy + the express.js server to resolve the correct .json path
}

export default ShowcaseDetail;
