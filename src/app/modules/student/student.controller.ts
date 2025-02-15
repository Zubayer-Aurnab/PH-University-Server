import { Request, Response } from 'express'
import { StudentServices } from './student.service'


const getAllStudent = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();

        res.status(200).json({
            success: true,
            message: "Student  Data  Retrive Successfully",
            data: result
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong",
            error: err,
        });
    }
}
const getSingleStudent = async (req: Request, res: Response) => {
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
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong",
            error: err,
        });
    }
}
const deleteStudent = async (req: Request, res: Response) => {
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
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong",
            error: err,
        });
    }
}

export const StudentControllers = {
    getAllStudent,
    getSingleStudent,
    deleteStudent
}
