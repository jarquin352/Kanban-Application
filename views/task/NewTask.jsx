import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import NewTask from './NewTask';
import TaskSearchBar from './TaskSearchBar';
/**
 * Define TaskList, a React componment of CS4050 project #5.
 */
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLetters: '',
      tasks:[], 
      taskTypes:[], 
    };
  }
  
  componentDidMount() {
    this.getTasks();
    this.getTaskTypes();
  }

  
  getTasks() {
    axios
      .get('/api/tasks')
      .then(response => {
        this.setState({
          tasks:response.data
        });
      }).catch(error => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
  }

  getTaskTypes() {
    axios
      .get('/api/task-types')
      .then(response => {
        this.setState({
          taskTypes:response.data
        });
      }).catch(error => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
  }
  
  handleSearch = () => {
    this.setState({ inputLetters: event.target.value });
  }

  handledragover = event => {
    event.preventDefault();
  };

  handledrop = event => {
    event.preventDefault();

    
    var newTasks = this.state.tasks;
    var task_id = event.dataTransfer.getData("task_id");

  	if (event.target.attributes.class.value === 'cse4050-task-list') {
      var type_id = event.target.attributes.type_id.value;
  	} else {
  		let node = event.target.closest('.cse4050-task-list');
  		if (node) {
        type_id = node.attributes.type_id.value;
  		}
  	}

    Object.keys(newTasks).map(function(key, index){
      if (newTasks[key]._id === task_id) {
        newTasks[key].type_id = type_id;
      }
    });

    axios.post('/api/tasks/'+task_id, {type_id:type_id})
      .then((response) => {
        this.setState({ tasks: newTasks });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
  };

  handledrag = event => {
    event.dataTransfer.setData("task_id", event.target.attributes.task_id.value);
  };

  render() {
    return (
      <Container disableGutters maxWidth="false" sx={{ px:1, py:1 }}>         
        <Grid container spacing={2} sx={{ pb:1 }}>
          <Grid item xs={6}>
            <NewTask />
          </Grid>
          <Grid item xs={6}>
            <TaskSearchBar value={this.state.inputLetters} onChange={this.handleSearch} />
          </Grid>
        </Grid>
          
        <Container disableGutters  maxWidth="ld" component="main">
          <Grid container spacing={2} alignItems="flex-end">
          {this.state.taskTypes?.map(type => (
            <Grid item xs={12} md={4} key={type.name+"-tasks"} className="new-tasks">
              <Card variant="outlined" sx={{ borderRadius:0,mb:1}}>
                <Typography sx={{px:2,py:1,fontWeight:500}}>{type.name}</Typography>
              </Card>
              <Stack
                id={type.name+"-tasks-stack"}
                type_id={type._id}
                droppable="true"
                onDragOver={this.handledragover}
                onDrop={this.handledrop}
                spacing={1}
                className="cse4050-task-list"
                sx={{
                  height: 600,
                }}
              >
                {this.state.tasks?.filter(task => task.type_id === type._id).map(task => (
                <Card
                  key={"task"+task._id}
                  id={"task"+task._id}
                  task_id={task._id}
                  draggable="true"
                  droppable="false"
                  onDragStart={this.handledrag}
                  variant="outlined"
                  className="cse4050-task-task"
                  sx={{ 
                      borderRadius: 0, 
                      borderLeft: 3, 
                      borderLeftColor:type.color,
                      borderColor: this.state.inputLetters && task.description.toLowerCase().includes(this.state.inputLetters.toLowerCase())?"secondary.main":""
                    }}
                >
                  <CardContent>
                    <Typography>{task.description}</Typography>
                  </CardContent>
                </Card>
                ))}
              </Stack>
            </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default TaskList;
