import mongoose, { Schema } from 'mongoose';
import { Guardian, LocalGuradian, Student, UserName } from './student.interface';

const userNameScema = new Schema<UserName>({
    firstName: { type: String, require: true },
    middleName: { type: String },
    lastName: { type: String, require: true }
})
const guardianScema = new Schema<Guardian>({
    fatherName: { type: String, require: true },
    fatherContactNo: { type: String, require: true },
    fatherOccupation: { type: String, require: true },
    motherContactNo: { type: String, require: true },
    motherName: { type: String, require: true },
    motherOccupation: { type: String, require: true }
})
const localGuardianScema = new Schema<LocalGuradian>({
    name: { type: String, require: true },
    occupation: { type: String, require: true },
    contactNo: { type: String, require: true },
    address: { type: String, require: true }
})

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: userNameScema,
    gender: ["female", "male"],
    dateOfBirth: String,
    email: String,
    contactNo: { type: String, require: true },
    emergencyContactNo: { type: String, require: true },
    bloodGroup: ["A+", " A-", "B+", "B-", " O+", " O-", "AB+", "AB-"],
    presentAddress: { type: String, require: true },
    permanentAddress: { type: String, require: true },
    guardian: guardianScema,
    localGuardian: localGuardianScema,
    profileImg: String,
    isActive: ["active", "block"]
});

export const StudentModel = mongoose.model<Student>("Student", studentSchema)