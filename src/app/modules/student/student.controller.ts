import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse';
import HttpStatus from 'http-status';

const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();
        sendResponse(res, {
            success: true, statusCode: HttpStatus.OK, data: result, message: "Student  Data  Retrive Successfully"
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
        sendResponse(res, {
            success: true, statusCode: HttpStatus.OK, data: result, message: "Student  Data  Retrive Successfully"
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
        sendResponse(res, {
            success: true, statusCode: HttpStatus.OK, data: result, message: "Student Deleted Successfully"
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
