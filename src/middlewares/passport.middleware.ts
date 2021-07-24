import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import userModel from "../models/user.model";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWTSECRET,
}

export default new Strategy(options, async (payload, done) => {
    try {
        const user = await userModel.findById(payload.id)
        if (user) {
            return done(null, user)
        }
        return done(null, false)
    } catch (error) {
    }
})