const express = require('express');
const router = express.Router();

const  { 
  getTasks,
  getTaskTypes,
  storeTask,
  updateTask
} = require('../app/controllers/task.js');

const  {
  login,
  checkLogin,
  logout,
  regist
} = require('../app/controllers/user.js');


router.get('/tasks', getTasks);
router.get('/task-types', getTaskTypes);
router.post('/tasks', storeTask);
router.post('/tasks/:task_id', updateTask);

router.post('/admin/login', login);
router.post('/admin/logout', logout);
router.get('/admin/currentUser',checkLogin);
router.post('/user', regist);

module.exports = router;