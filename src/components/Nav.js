import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    this.setState({
      categories: (await axios.get('/api/categories')).data,
    });
  }
  
  render() {
    const { categories } = this.state;
    return (
      <>
        <nav>
          {categories.map(category => (
            <Link to={`/${category.name.toLowerCase()}`}>{category.name}</Link>
          ))}
        </nav>
      </>
    );
  }
};