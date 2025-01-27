import express from 'express';
import TasksController from '../controllers/tasks-controller';

const tasksController = new TasksController();
const taksRouter = express.Router();

taksRouter.get('/', tasksController.listAllTasks);
taksRouter.post('/', tasksController.createNewTask);
taksRouter.put('/:taskId', tasksController.updateTask);
taksRouter.delete('/:taskId', tasksController.deleteTask);

export default taksRouter;