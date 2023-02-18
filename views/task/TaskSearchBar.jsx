import React from 'react';
import TextField from '@mui/material/TextField';

class TaskSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLetters: '',
    };
  }

  handleSearch = event => {
    this.props.onChange(event);
  }

  render() {
    return (
      <TextField
        id="outlined-search"
        label="Search tasks"
        type="search"
        size="small"
        value={this.props.value}
        onChange={this.handleSearch}
        sx={{float:"right"}}
      />
    );
  }
}

export default TaskSearchBar;
