import mongoose, { Schema } from 'mongoose';
import { TGuardian, TLocalGuradian, TStudent, StudentModel, TUserName } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';


const userNameScema = new Schema<TUserName>({
    firstName: { type: String, required: [true, "First name is required"], trim: true, },
    middleName: { type: String, required: [true, "Middle name is required"], trim: true },
    lastName: { type: String, required: [true, "Last name is required"], trim: true, }
});

const guardianScema = new Schema<TGuardian>({
    fatherName: { type: String, required: [true, "Father's name is required"], trim: true },
    fatherContactNo: { type: String, required: [true, "Father's contact number is required"], trim: true },
    fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
    motherContactNo: { type: String, required: [true, "Mother's contact number is required"], trim: true },
    motherName: { type: String, required: [true, "Mother's name is required"], trim: true },
    motherOccupation: { type: String, required: [true, "Mother's occupation is required"] }
});

const localGuardianScema = new Schema<TLocalGuradian>({
    name: { type: String, required: [true, "Local guardian's name is required"] },
    occupation: { type: String, required: [true, "Local guardian's occupation is required"] },
    contactNo: { type: String, required: [true, "Local guardian's contact number is required"] },
    address: { type: String, required: [true, "Local guardian's address is required"] }
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: [true, "Student ID is required"], unique: true },
    password: { type: String, required: [true, "Password is required"], maxlength: [20, 'can not be more then 20 charecters'], minlength: [8, "must be in 8 charecters"] },
    name: { type: userNameScema, required: [true, "Student's name is required"] },
    gender: {
        type: String,
        enum: {
            values: ["female", "male", "other"],
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
    },
    isDeleted: { type: Boolean, default: false }
}, {
    toJSON: {
        virtuals: true
    }
});


//pre save middleware / hook
studentSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(user.password, 12);
    next()
})
//post save middleware / hook
studentSchema.post('save', function (doc, next) {
    doc.password = ""
    next()
})
//Query Middleware 
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
})

studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + " " + this.name.middleName + " " + this.name.lastName
})

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id })
    return existingUser
}


//creating a custome instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id })
//     return existingUser
// }

export const Student = mongoose.model<TStudent, StudentModel>("Student", studentSchema);
