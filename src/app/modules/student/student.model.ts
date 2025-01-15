import { Schema, model, connect } from 'mongoose';
import { Student } from './student.interface';


const studentSchema = new Schema<Student>({
    id: { type: String },
    name: {
        firstName: { type: String, require: true },
        middleName: { type: String },
        lastName: { type: String, require: true }
    },
    gender: ["female", "male"],
    dateOfBirth: String,
    email: String,
    contactNo: { type: String, require: true },
    emergencyContactNo: { type: String, require: true },
    bloodGroup: ["A+", " A-", "B+", "B-", " O+", " O-", "AB+", "AB-"],
    presentAddress: { type: String, require: true },
    permanentAddress: { type: String, require: true },
    guardian: {
        fatherName: { type: String, require: true },
        fatherContactNo: { type: String, require: true },
        fatherOccupation: { type: String, require: true },
        motherContactNo: { type: String, require: true },
        motherName: { type: String, require: true },
        motherOccupation: { type: String, require: true }
    },
    localGuardian: {
        name: { type: String, require: true },
        occupation: { type: String, require: true },
        contactNo: { type: String, require: true },
        address: { type: String, require: true }
    },
    profileImg: String,
    isActive: ["active", "block"]
});