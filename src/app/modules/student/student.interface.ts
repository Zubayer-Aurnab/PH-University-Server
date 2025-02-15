import { Model, Types } from "mongoose"

export type TGuardian = {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
}
export type TLocalGuradian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type TStudent = {
    id: string
    user: Types.ObjectId
    // password: string
    name: TUserName;
    gender: "male" | "female" | "other"
    dateOfBirth?: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup?: "A+" | " A-" | "B+" | "B-" | " O+" | " O-" | "AB+" | "AB-"
    email: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian
    avatar?: string;
    localGuardian: TLocalGuradian;
    profileImg?: string;
    isDeleted: boolean
}

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}

// export interface StudentMethod extends Model<TStudent> {
//     isUserExists(id: string): Promise<TStudent | null>
// }

// C type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>