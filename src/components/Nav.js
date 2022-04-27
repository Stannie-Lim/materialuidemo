import React from 'react';
import { Link } from 'react-router-dom';

export class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to='/products'>Products</Link>
        <Link to='/categories'>Categories</Link>
      </nav>
    );
  }
};