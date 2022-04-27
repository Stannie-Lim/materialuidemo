import React from 'react';

export class Categories extends React.Component {
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
    return <h1>Categories</h1>;
  }
};