import React from 'react';
import axios from 'axios';

export class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  async componentDidMount() {
    const { categoryName } = this.props.match.params;
    this.setState({
      category: (await axios.get(`/api/${categoryName}/products`)).data,
    });
  }


  async componentDidUpdate(prevProps) {
    const { categoryName } = this.props.match.params;
    if (prevProps.match.params.categoryName !== categoryName) {
      this.setState({
        category: (await axios.get(`/api/${categoryName}/products`)).data,
      });
    }
  }

  render() {
    const products = this.state.category?.products || [];
    return (
      <>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.rating}</p>
              <p>{product.price}</p>
              <img src={product.imageUrl} />
            </li>
          ))}
        </ul>
      </>
    );
  }
};