
export type Guarrdian = {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
}
export type LocalGuradian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type Student = {
    id: string
    name: UserName;
    gender: "male" | "female"
    dateOfBirth?: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: "A+" | " A-" | "B+" | "B-" | " O+" | " O-" | "AB+" | "AB-"
    email: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: Guarrdian
    avatar?: string;
    localGuardian: LocalGuradian;
    profileImg?: string;
    isActive: "active" | "block"
}

