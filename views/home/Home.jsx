import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin() {
    axios.get('/api/admin/currentUser')
      .then((response) => {
        if (response.status===200) {
          this.setState({current_user: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
  }
  
  render() {
    return (
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          {this.state.current_user?'Hello '+this.state.current_user+', welcome to your Kanban board app!':'Loading...'}
        </Typography>
      </Container>
    );
  }
}

export default Home;
