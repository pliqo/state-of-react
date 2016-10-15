import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, render, mount } from 'enzyme';
import Home from '../components/Home';

it('renders without crashing', () => {
  const el = document.createElement('div');
  ReactDOM.render(<Home />, el);
});
