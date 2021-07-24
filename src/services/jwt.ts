import { IUser } from "../models/user.model";
import jwt from 'jsonwebtoken'
import config from "../config/config";

export function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email, user: user.user }, config.JWTSECRET, {
        expiresIn: 86400
    });
}