import React from 'react';
import axios from 'axios';

export class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    this.setState({
      products: (await axios.get('/api/products')).data,
    });
  }

  render() {
    const { products } = this.state;
console.log(products);
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