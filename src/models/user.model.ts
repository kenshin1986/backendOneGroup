import { model, Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string;
    password: string;
    user: string;
    firstName: string;
    lastName: string;
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
    user: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
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
    if (!user.isModified('password')) return next();

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