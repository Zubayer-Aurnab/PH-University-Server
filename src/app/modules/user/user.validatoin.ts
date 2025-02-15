import { z } from "zod";

export const userValidationSchema = z.object({
    id: z.string({
        required_error: "ID is required",
        invalid_type_error: "ID must be a string",
    }).nonempty("ID is required"),

    password: z.string({
        invalid_type_error: "Password must be a string",
    }).min(6, "Min 6 chars").optional(),
});


export const UserValidation = {
    userValidationSchema
}
