// import studentValidationSchema from "../student/student.validation";
import HttpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { RequestHandler } from "express";


const createStudent: RequestHandler = async (req, res, next) => {
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