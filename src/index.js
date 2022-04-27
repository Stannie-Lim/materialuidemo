import axios from 'axios';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import { Nav } from './components/Nav';
import { Products } from './components/Products';
import { Categories } from './components/Categories';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
    };
  }
  
  async componentDidMount() {
    this.setState({
      products: (await axios.get('/api/products')).data,
      categories: (await axios.get('/api/categories')).data,
    });
  }

  render() {
    return (
      <HashRouter>
        <Route path='/' component={Nav} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/categories' component={Categories} />
      </HashRouter>
    );
  }
}

render(<App />, document.querySelector('#root'));