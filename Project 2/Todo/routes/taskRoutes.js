import express from 'express';
import { getAllTodos, getTodoById, createTodo } from '../controllers/taskControllers.js';

const taskRouter = express.Router();

taskRouter.get('/', getAllTodos);
taskRouter.get('/task/:id', getTodoById);
taskRouter.post('/addTodo', createTodo);

export default taskRouter;