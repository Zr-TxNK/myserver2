import { Request, Response } from 'express';
import User from './User';
import { Utils } from './Utils';

export const creteUser = async (req: Request, res: Response) => {
    try { 
        const { username, email, password, age } = req.body;

        // ใช้ Utility Function แทนการเขียนเงื่อนไขตรวจสอบ (เช่น if (age < 0)) ใน Controller
        if (!Utils.isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (!Utils.isValidAge(age)) {
            return res.status(400).json({ message: 'Invalid age: must be an integer between 1 and 120' });
        }

        const newUser = new User({username, email, password, age});
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserById =async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, password, age } = req.body;

        if (email !== undefined && !Utils.isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (age !== undefined && !Utils.isValidAge(age)) {
            return res.status(400).json({ message: 'Invalid age: must be an integer between 1 and 120' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password, age },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
