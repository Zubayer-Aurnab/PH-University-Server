import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
    try {

        const { student: studentData } = req.body
        const { error, value } = studentValidationSchema.validate(studentData)
        if (error) {
            res.status(500).json({
                success: false,
                message: "Something  went  wrong joi  ",
                error: error.details
            })
        }
        const result = await StudentServices.createStudentIntoDB(value)

        res.status(200).json({
            success: true,
            message: "Student  created  succesfully",
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something  went  wrong",
            error: err
        })
    }
}

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
