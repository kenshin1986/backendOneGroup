import { model, Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {},
    lastName: {}
},
    {
        timestamps: true
    }
)

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password') || !user.password) return next();
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const user: any = this
    return await bcrypt.compare(password, user.password);
}

export default model<IUser>('User', userSchema);