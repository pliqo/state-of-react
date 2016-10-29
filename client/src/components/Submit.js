import React, { Component } from 'react';

import './Submit.css';

class Submit extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: [],
      name: '',
      url: '',
      body: '',
      class: ''
    };
  }

  handleChange(e) {
    console.log(e.target + ' ' + e.target.value);
    if(e.target.name === 'name') {
      this.setState({name: e.target.value})
    }
    if(e.target.name === 'url') {
      this.setState({url: e.target.value})
    }
    if(e.target.name === 'body') {
      this.setState({body: e.target.value})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      name: this.state.name,
      url: this.state.url,
      body: this.state.body,
      id: Date.now()
    };
    console.log(newItem);
    this.setState((prevState) => ({
      data: prevState.data.concat(newItem),
      name: '',
      url: '',
      body: '',
      class: ''
    }));
  }

  render() {
    return (   
      <div className="submit">
        <h3>Submit</h3>
        <p>Submit your favorite framework, tool, build, repo or whatever you think could be of interest to be showcased here!</p>
        <form onSubmit={this.handleSubmit}>
          <p><label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} className={this.state.class} placeholder="Create React App" aria-describedby="name-format" required aria-required="true" pattern="[A-Za-z-0-9]+\s[A-Za-z-'0-9]+" />
          </p>
          <p><label htmlFor="url">Url</label>
            <input type="url" name="url" onChange={this.handleChange} value={this.state.url} className={this.state.class} placeholder="https://github.com/facebookincubator/create-react-app" required="required" />
          </p>
          <p><label htmlFor="body">Description</label>
            <textarea name="body" rows="3" onChange={this.handleChange} value={this.state.body} className={this.state.class} placeholder="Create React apps with no build configuration." required="required" />
          </p>
          <button>Submit your link</button>
        </form>
      </div>
    );
  }
}

export default Submit;
