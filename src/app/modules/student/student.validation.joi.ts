import Joi from 'joi';
const userNameSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .regex(/^[A-Z][a-z]*$/)
        .messages({
            "string.empty": "First name is required",
            "string.pattern.base": "First name must start with a capital letter",
        }),
    middleName: Joi.string()
        .trim()
        .required()
        .messages({ "string.empty": "Middle name is required" }),
    lastName: Joi.string()
        .trim()
        .required()
        .regex(/^[A-Za-z]+$/)
        .messages({
            "string.empty": "Last name is required",
            "string.pattern.base": "{VALUE} is not a valid last name. Only alphabetic characters are allowed.",
        }),
});
const guardianSchema = Joi.object({
    fatherName: Joi.string().trim().required().messages({ "string.empty": "Father's name is required" }),
    fatherContactNo: Joi.string()
        .trim()
        .required()
        .messages({ "string.empty": "Father's contact number is required" }),
    fatherOccupation: Joi.string().required().messages({ "string.empty": "Father's occupation is required" }),
    motherName: Joi.string().trim().required().messages({ "string.empty": "Mother's name is required" }),
    motherContactNo: Joi.string()
        .trim()
        .required()
        .messages({ "string.empty": "Mother's contact number is required" }),
    motherOccupation: Joi.string().required().messages({ "string.empty": "Mother's occupation is required" }),
});
const localGuardianSchema = Joi.object({
    name: Joi.string().required().messages({ "string.empty": "Local guardian's name is required" }),
    occupation: Joi.string().required().messages({ "string.empty": "Local guardian's occupation is required" }),
    contactNo: Joi.string()
        .required()
        .messages({ "string.empty": "Local guardian's contact number is required" }),
    address: Joi.string().required().messages({ "string.empty": "Local guardian's address is required" }),
});
const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({ "string.empty": "Student ID is required" }),
    name: userNameSchema.required().messages({ "any.required": "Student's name is required" }),
    gender: Joi.string()
        .valid("male", "female")
        .required()
        .messages({
            "any.only": 'Gender must be either "male" or "female".',
            "string.empty": "Gender is required",
        }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "{VALUE} is not a valid Email",
        }),
    contactNo: Joi.string().required().messages({ "string.empty": "Contact number is required" }),
    emergencyContactNo: Joi.string().required().messages({ "string.empty": "Emergency contact number is required" }),
    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-")
        .optional()
        .messages({
            "any.only": "Invalid blood group. Choose from: A+, A-, B+, B-, O+, O-, AB+, AB-.",
        }),
    presentAddress: Joi.string()
        .required()
        .messages({ "string.empty": "Present address is required" }),
    permanentAddress: Joi.string()
        .required()
        .messages({ "string.empty": "Permanent address is required" }),
    guardian: guardianSchema.required().messages({ "any.required": "Guardian details are required" }),
    localGuardian: localGuardianSchema.required().messages({ "any.required": "Local guardian details are required" }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
        .valid("active", "block")
        .default("active")
        .messages({
            "any.only": 'The status must be either "active" or "block".',
        }),
})
export default {studentValidationSchema}