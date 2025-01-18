import mongoose, { Schema } from 'mongoose';
import { Guardian, LocalGuradian, Student, UserName } from './student.interface';
import validator from 'validator';
const userNameScema = new Schema<UserName>({
    firstName: {
        type: String, required: [true, "First name is required"], trim: true, validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value
            },
            message: "Value is not in capitalize formate"
        }
    },
    middleName: { type: String, required: [true, "Middle name is required"], trim: true },
    lastName: {
        type: String, required: [true, "Last name is required"],
        trim: true,
        validate: {
            validator: (value: string) => {
                return validator.isAlpha(value);
            },
            message: "{VALUE} is not a valid last name. Only alphabetic characters are allowed."
        }
    }
});

const guardianScema = new Schema<Guardian>({
    fatherName: { type: String, required: [true, "Father's name is required"], trim: true },
    fatherContactNo: { type: String, required: [true, "Father's contact number is required"], trim: true },
    fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
    motherContactNo: { type: String, required: [true, "Mother's contact number is required"], trim: true },
    motherName: { type: String, required: [true, "Mother's name is required"], trim: true },
    motherOccupation: { type: String, required: [true, "Mother's occupation is required"] }
});

const localGuardianScema = new Schema<LocalGuradian>({
    name: { type: String, required: [true, "Local guardian's name is required"] },
    occupation: { type: String, required: [true, "Local guardian's occupation is required"] },
    contactNo: { type: String, required: [true, "Local guardian's contact number is required"] },
    address: { type: String, required: [true, "Local guardian's address is required"] }
});

const studentSchema = new Schema<Student>({
    id: { type: String, required: [true, "Student ID is required"], unique: true },
    name: { type: userNameScema, required: [true, "Student's name is required"] },
    gender: {
        type: String,
        enum: {
            values: ["female", "male"],
            message: 'Gender must be either "male" or "female".'
        },
        required: [true, "Gender is required"]
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: "{VALUE} is not a valid Email"
        },
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: { type: String, required: [true, "Emergency contact number is required"] },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            message: "Invalid blood group. Choose from: A+, A-, B+, B-, O+, O-, AB+, AB-."
        }
    },
    presentAddress: { type: String, required: [true, "Present address is required"] },
    permanentAddress: { type: String, required: [true, "Permanent address is required"] },
    guardian: { type: guardianScema, required: [true, "Guardian details are required"] },
    localGuardian: { type: localGuardianScema, required: [true, "Local guardian details are required"] },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: {
            values: ["active", "block"],
            message: 'The status must be either "active" or "block".'
        },
        default: "active"
    }
});

export const StudentModel = mongoose.model<Student>("Student", studentSchema);
