import { model, Schema } from "mongoose"
import { TUser } from "./user.interface"
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
    id: { type: String, required: true },
    password: { type: String, maxlength: [20, 'can not be more then 20 charecters'], minlength: [8, "must be in 8 charecters"], },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'] },
    status: { type: String, enum: ['in-progress', 'blocked'], default: "in-progress" },
    isDeleted: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
)
// pre save middleware / hook
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(user.password, 12);
    next();
});
//post save middleware / hook
userSchema.post('save', function (doc, next) {
    doc.password = "hidden"
    next()
})

export const User = model<TUser>('User', userSchema)