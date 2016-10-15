import React, { Component } from 'react';

import avgRates from '../utils/avgRates.js';
import fetcher from '../utils/fetcher.js';
import formatDate from '../utils/formatDate.js';

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

  getFormatDate(date) {
    return formatDate(date);
  }

  render() {
    let reviews = this.state.data.reviews;
    let externalUrl = this.state.data.url;
    if(reviews) {
      reviews.sort(function(a, b){
          let dateA = new Date(a.created_at)
          let dateB = new Date(b.created_at);
          return dateB-dateA //sort by date descending
      })
    }
    return (   
        <div className="detail">
          <h1>{this.state.data.name}</h1>
          <small>{this.getFormatDate(this.state.data.created_at)}</small>
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
                <small>{this.getFormatDate(item.created_at)}</small>
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
