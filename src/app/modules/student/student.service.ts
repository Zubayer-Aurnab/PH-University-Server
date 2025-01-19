
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
    // const result = await StudentModel.create(studentData)
    const student = new Student(studentData)//create and instance

    if (await student.isUserExists(studentData.id)) {
        throw new Error('User already exists')
    }

    const result = await student.save()
    return result
}
const getAllStudentFromDB = async () => {
    const result = await Student.find()
    return result
}
const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ id })
    return result
}


export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB
}
