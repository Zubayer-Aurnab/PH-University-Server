// import studentValidationSchema from "../student/student.validation";
import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;
        // const zodParsedData = studentValidationSchema.parse(studentData);
        const result = await UserServices.createStudentIntoDB(password, studentData);
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong",
            error: err,
        });
    }
};

export const UserControllers = {
    createStudent
}