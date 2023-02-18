const Task = require('../models/task.js');
const TaskType = require('../models/taskType.js');


const getTasks =((req, res) => {
  if (!req.session.user_id) {
    res.status(401).send("Not logged in");
    return;
  }
  Task.find({user_id: req.session.user_id}).exec(function (err, data) {
    res.status(200).send(data);
  })
});


const getTaskTypes = ((req, res) =>{
  if (!req.session.user_id) {
    res.status(401).send("Not logged in");
    return;
  }
  var query = TaskType.find({});
  query.sort('_id').exec(function (err, data) {
    res.status(200).send(data);
  })
});


const storeTask = ((req, res) =>{
  if (!req.session.user_id) {
    res.status(401).send("Not logged in");
    return;
  }

  let {description, type_id} = req.body;

  if (!description) {
    res.status(400).send("Please fill in the description.");
    return;
  } else {
    const user_id = req.session.user_id;
    Task.create({
      description, user_id, type_id
    }, function(err, newTask) {
      if (err) {
         res.status(400).send('Unable to add a new task.');
         return;
      }
      res.status(200).send("A new task added.");
    })
  }
});


const updateTask = ((req, res) =>{
  if (!req.session.user_id) {
    res.status(401).send("not logged in");
    return;
  }
  let task_id = req.params.task_id;
  let curr_user = req.session.user_id;
  let type_id = req.body.type_id;

  if (!type_id) {
    res.status(400).send("invalid request");
    return;
  }

  Task.findOne({ _id: task_id }, function(err, task) {
    if (err) {
      res.status(400).send("invalid task id");
      return;
    }
    task.type_id = type_id;
    task.save();
    res.status(200).send("Task updated successfully");
  });
});


module.exports = {
    getTasks,
    getTaskTypes,
    storeTask,
    updateTask
};