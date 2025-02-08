import { z } from "zod";

export const userValidationSchema = z.object({
    id: z.string().nonempty("ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    needsPasswordChange: z.boolean().optional().default(true),
    role: z.enum(["student", "faculty", "admin"]),
    status: z.enum(["in-progress", "blocked"]).default('in-progress'),
    isDeleted: z.boolean().optional().default(false)
});

export const UserValidation = {
    userValidationSchema
}
