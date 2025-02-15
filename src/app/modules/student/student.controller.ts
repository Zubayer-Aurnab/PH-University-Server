import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'


const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();

        res.status(200).json({
            success: true,
            message: "Student  Data  Retrive Successfully",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await StudentServices.getSingleStudentFromDB(id);

        res.status(200).json({
            success: true,
            message: "Student  Data  Retrive Successfully",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await StudentServices.deleteStudentFromDB(id);
        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}

export const StudentControllers = {
    getAllStudent,
    getSingleStudent,
    deleteStudent
}
