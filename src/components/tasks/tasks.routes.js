const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTaskStatus } = require('./tasks.controller');
const auth = require('../middleware/authMiddleware'); // ПОДКЛЮЧИТЕ МИДЛВАР!!! 


router.use(auth);

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id/status', updateTaskStatus);

module.exports = router;
