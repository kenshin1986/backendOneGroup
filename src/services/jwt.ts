import { IUser } from "../models/user.model";
import jwt from 'jsonwebtoken'
import config from "../config/config";

export function createToken(user: IUser) {
    return jwt.sign({ id: user._id, email: user.email }, config.JWTSECRET, {
        expiresIn: 86400
    });
}