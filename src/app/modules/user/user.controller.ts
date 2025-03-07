// import studentValidationSchema from "../student/student.validation";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import HttpStatus from "http-status";
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;
        // const zodParsedData = studentValidationSchema.parse(studentData);
        const result = await UserServices.createStudentIntoDB(password, studentData);
        sendResponse(res, {
            success: true, statusCode: HttpStatus.OK, data: result, message: "Student is created successfully"
        })
    } catch (err) {
        next(err);
    }
};

export const UserControllers = {
    createStudent
}