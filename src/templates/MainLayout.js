import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from '../logo.svg';

import './MainLayout.css';

class MainLayout extends Component {
  render() {
    return (
      <div className="main">
        <header className="main_header">
          <div className="wrap">
            <h1 className="main_logo">
              <Link to="/"><img src={ logo } alt="logo" /><span>Pliqo</span></Link>
            </h1>
          </div>
        </header>
        <nav className="main_nav">
          <ul>
            <li><Link to="/showcase" activeClassName="active">Showcase</Link></li>
            <li><Link to="/submit" activeClassName="active">Submit</Link></li>
          </ul>
        </nav> 
        <div className="wrap">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainLayout;