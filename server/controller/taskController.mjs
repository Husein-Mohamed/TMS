import Task from '../models/Task.mjs';
import moment from 'moment';
import { sendOverdueEmail } from '../utils/emailService.mjs';

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ message: 'Task created', data: task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTasksWithDeadlineStatus = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name');
        const now = moment();

        const tasksWithColor = tasks.map(task => {
            const dueDate = moment(task.dueDate);
            const diff = dueDate.diff(now, 'hours');
            
            let color = 'grey';  // Default color for more than one day

            if (diff <= 24 && diff > 0) {
                color = 'yellow';  // Due in less than 24 hours
            } else if (diff <= 0) {
                color = 'red';  // Overdue
                sendOverdueEmail(task);  // Send email if overdue
            }

            return { ...task._doc, color };
        });

        res.status(200).json({ tasks: tasksWithColor });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
