import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;

        // Validate with Zod to ensure it matches the schema
        const zodParsedData = studentValidationSchema.parse(studentData);

        const result = await StudentServices.createStudentIntoDB(zodParsedData);

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
        console.log(err)
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
        console.log(err)
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudent,
    getSingleStudent
}
