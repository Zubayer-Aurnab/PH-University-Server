import config from "../../config"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    //set  student role
    const userData: Partial<TUser> = {
        password: '',
        role: 'student',
        id: ''
    }
    userData.password = password || (config.default_password as string)
    userData.id = '2030010001'
    //create student
    const newUser = await User.create(userData)
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id
        studentData.user = newUser._id //referance to user
    }

    const newStudent = await Student.create(studentData)

    return newStudent
}
export const UserServices = {
    createStudentIntoDB
}