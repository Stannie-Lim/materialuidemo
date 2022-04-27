import React from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

export class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      modalOpen: false,
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

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const products = this.state.category?.products || [];
    const { openModal, closeModal } = this;
    const { modalOpen } = this.state;
    return (
      <>
        {modalOpen && (
          <Dialog open={modalOpen} onClose={closeModal}>
              <h1>hello</h1>
          </Dialog>
        )}
        <ul>
          {products.map(product => (
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                title={product.name}
              />
                <CardMedia
                  component="img"
                  height="194"
                  image={product.imageUrl}
                  alt="idk"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Rating name="read-only" value={product.rating} readOnly />
                  <Button onClick={openModal} color="warning" variant="outlined">Edit</Button>
                </CardContent>
              </Card>
          ))}
        </ul>
      </>
    );
  }
};