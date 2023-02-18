import React from 'react';
import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './TopBar.css';
import axios from 'axios';

class TopBar extends React.Component {

  handleLogout = () => {
		axios.post('/api/admin/logout')
			.then((response) => {
				if (response.status===200) {
					console.log(response);
					location.reload();
				}
			})
			.catch((error) => {
				console.log(error.data);
			});
	}
  
	render() {
		return (
			<AppBar position="static">
        <Toolbar className="cse4050-toolbar">
          <Typography variant="h6" className="cse4050-logo">
            Project 6 Kanban Application
          </Typography>

          <Stack
						direction="row"
						spacing={2}
						sx={{ '& a.active': {color:theme=>theme.palette.primary.contrastText, bgcolor:theme=>theme.palette.primary.main, } }}
					>
						<Button to="/" variant="outlined" component={NavLink} end>Home</Button>
						<Button to="/tasks" variant="outlined" component={NavLink}>Tasks</Button>
            {this.props.currentUser?
							<Button variant="text" onClick={this.handleLogout} >Logout</Button>:
							<Button to="/login" variant="text" component={NavLink}>Login</Button>
						}
					</Stack>
         </Toolbar>
      </AppBar>
		);
	}
}
export default TopBar;
