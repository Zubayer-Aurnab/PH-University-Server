import { Request, Response } from 'express'
import { StudentServices } from './student.service'



const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body
        const result = await StudentServices.createStudentIntoDB(studentData)

        res.status(200).json({
            success: true,
            message: "Student  created  succesfully",
            data: result
        })
    }
    catch (err) {
        console.log(err)
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
