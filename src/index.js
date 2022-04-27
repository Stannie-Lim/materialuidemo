import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import { Nav } from './components/Nav';
import { Category } from './components/Category';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route path='/' component={Nav} />
        <Route exact path='/:categoryName' component={Category} />
      </HashRouter>
    );
  }
}

render(<App />, document.querySelector('#root'));