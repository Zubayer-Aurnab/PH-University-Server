import express from 'express'
import { StudentControllers } from './student.controller';
const router = express.Router()


// router.post('/create-student', StudentControllers.createStudent);
router.get('/get-student', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);


export const StudentRoutes = router