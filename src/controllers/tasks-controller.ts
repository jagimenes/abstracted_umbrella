import { Request, Response } from "express";
import Task from "../models/task.model";

export default class TasksController {
    private tasks: Task[] = [];
    private taskCounter = 1;
    
    listAllTasks = (req: Request, res: Response): void => {
        res.status(200).json(this.tasks);
    }

    createNewTask = (req: Request, res: Response): void => {
        const { title, completed } = req.body;

        if (!(typeof title == 'string')) {
            res.status(400).json({
                code: 400,
                message: 'title is missing'
            });

            return;
        }

        if (!(typeof completed == 'boolean')) {
            res.status(400).json({
                code: 400,
                message: 'completed is missing'
            });
            
            return;
        }

        const createdTask = {
            id: this.taskCounter++,
            title,
            completed
        } as Task;

        this.tasks.push(createdTask);

        res.status(201).json(createdTask);
    }

    updateTask = (req: Request, res: Response): void => {
        const taskId = parseInt(req.params['taskId']);

        let taskIndex = this.tasks.findIndex(task => task.id == taskId);

        if (taskIndex === -1) {
            res.status(404).json({
                code: 404,
                message: 'task does not exist'
            })

            return;
        }

        const { title, completed } = req.body;

        if (!(typeof title == 'string')) {
            res.status(400).json({
                code: 400,
                message: 'title is missing'
            });

            return;
        }

        if (!(typeof completed == 'boolean')) {
            res.status(400).json({
                code: 400,
                message: 'completed is missing'
            });

            return;
        }
        
        const updatedTask = {
            ...this.tasks[taskIndex],
            title,
            completed,
        };

        this.tasks[taskIndex] = updatedTask;

        res.status(200).json(updatedTask);
    }

    deleteTask = (req: Request, res: Response): void => {
        const taskId = parseInt(req.params['taskId']);

        let taskToUpdate = this.tasks.find(task => task.id == taskId);

        if (!taskToUpdate) {
            res.status(404).json({
                code: 404,
                message: 'task does not exist'
            });

            return;
        }

        this.tasks = this.tasks.filter(task => task.id != taskId);

        res.status(200).send();
    }
}