import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

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
    const pages = ['Products', 'Pricing', 'Blog'];
    
    return (
      <>
        <AppBar position="static" enableColorOnDark={true} color="secondary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {categories.map((category) => (
                <MenuItem key={category.id}>
                  <Link style={{ textDecoration: 'none', color: 'white' }}  to={`/${category.name.toLowerCase()}`}>
                    <Typography textAlign="center">{category.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }
};