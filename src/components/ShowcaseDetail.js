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

  formatDate(date) {
    const d = new Date(date);
    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
  }

  render() {
    let reviews = this.state.data.reviews;
    let externalUrl = this.state.data.url;
    return (   
        <div className="detail">
          <h1>{this.state.data.name}</h1>
            <p>
              {this.state.data.body}<br/>
              <a href={externalUrl} target="_blank">{externalUrl}</a>
            </p>
            <p>
              Reviews: {(reviews)?reviews.length:''} - Avg. rate: { (reviews)?this.getAvgRates(reviews):''}              
            </p>
            <ul className="review_list">
              {(reviews)?reviews.map((item, index) =>
                <li key={index} className="list_item">
                <small>{this.formatDate(item.created_at)}</small>
                <h3>
                  {item.reviewer_username}
                </h3>                
                <p>
                  {item.review}
                </p>
                <p>
                  Rate: {item.rate}
                </p>
                </li>
              ):''}
          </ul>
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
