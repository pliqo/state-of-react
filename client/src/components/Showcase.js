import React, { Component } from 'react';
import { Link } from 'react-router'

import avgRates from '../utils/avgRates.js';
import fetcher from '../utils/fetcher.js';
import formatDate from '../utils/formatDate.js';

import './Showcase.css';

class Showcase extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  fetchData() {
    let query = (this.props.location.query.sort)?'?sort='+this.props.location.query.sort:'';
    const url = this.props.fetchUrl+query;
    //console.log(url);
    fetcher(url, (data) => {
      this.setState({ 
        data: data
      }); 
    });  
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
   return ( 
        <div className="showcase">  
          <h3>Showcase</h3>
          Sort: by Date (<Link to={{ pathname: '/showcase', query: { sort: 'dateasc' }}}>asc</Link>, <Link to={'/showcase'}>desc</Link>) 
          or by Name (<Link to={{ pathname: '/showcase', query: { sort: 'nameasc' }}}>asc</Link>, <Link to={{ pathname: '/showcase', query: { sort: 'namedesc' }}}>desc</Link>)
          <ShowcaseList data={this.state.data}/>
          
        </div>
    );
  }
}

const ShowcaseList = (props) => {  
  return (
    <ul className="showcase_list">
      {props.data.map((item, index) =>
      <li key={index} className="list_item">
        <h2><Link to={'/'+item.id}>{item.name}</Link></h2>
        <small>{formatDate(item.created_at)}</small>
        <p>
        {item.body}<br/>
        Reviews: {item.reviews.length} - Avg. rate: { avgRates(item.reviews) }            
        </p>
      </li>
      )}
    </ul>
  )
}

Showcase.propTypes = {
  fetchUrl: React.PropTypes.string
}

// Give some defaults
Showcase.defaultProps = {
  fetchUrl: 'api/showcase' // we use a proxy + the express.js server to resolve the correct .json path
}

export default Showcase;
