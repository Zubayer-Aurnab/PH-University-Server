import { NextFunction, RequestHandler, Request, Response } from 'express';
import HttpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';



const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    }
}

const getAllStudent = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res, {
        success: true, statusCode: HttpStatus.OK, data: result, message: "Student  Data  Retrive Successfully"
    })
}
)
const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await StudentServices.getSingleStudentFromDB(id);
    sendResponse(res, {
        success: true, statusCode: HttpStatus.OK, data: result, message: "Student  Data  Retrive Successfully"
    })
}
)
const deleteStudent = catchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await StudentServices.deleteStudentFromDB(id);
        sendResponse(res, {
            success: true, statusCode: HttpStatus.OK, data: result, message: "Student Deleted Successfully"
        })
    }

)

export const StudentControllers = {
    getAllStudent,
    getSingleStudent,
    deleteStudent
}
