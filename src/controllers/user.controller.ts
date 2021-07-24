import { Request, Response, NextFunction } from 'express'
import UserModel, { IUser } from '../models/user.model'
import { createToken } from '../services/jwt'

export interface RequestNext extends Request {
    message: string,
    error: string,
    json: any,
    typeResponse: number,
}

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
    const { $limit, $skip } = req.query
    const limit = parseInt($limit) || 10
    const skip = parseInt($skip) || 0
    try {
        const users = await UserModel.find().limit(limit).skip(skip);

        req.typeResponse = 200
        req.json = {
            limit,
            skip,
            total: (await UserModel.find()).length,
            data: users,
        }
    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}

export const signUp = async (req: any, res: Response, next: NextFunction) => {
    const { email, password, user } = req.body
    try {
        if (email && password && user) {
            const userSelect = await UserModel.findOne({ $or: [{ user }, { email }] })
            if (!userSelect) {
                const newUser = new UserModel(req.body)
                const response: any = await newUser.save()
                req.typeResponse = 200
                req.json = {
                    currentUser: response._doc,
                    token: createToken(response._doc)
                }
            } else {
                req.typeResponse = 400
                req.message = "Usuario ya registrado"
            }
        } else {
            req.typeResponse = 400
            req.message = "Los datos email, user y password son obligatorios"
        }

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}

export const signIn = async (req: any, res: Response, next: NextFunction) => {
    const { user, password } = req.body
    try {
        if (user && password) {
            const userSelect = await UserModel.findOne({ $or: [{ user }, { email: user }] })
            const isMatch = await userSelect?.comparePassword(password)
            if (userSelect && isMatch) {
                req.json = {
                    currentUser: userSelect,
                    token: createToken(userSelect)
                }
            } else {
                req.typeResponse = 400
                req.message = "Usuario o contraseña incorrectos"
            }
        } else {
            req.typeResponse = 400
            req.message = "Los datos user y password son obligatorios"
        }
    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()

}


export const patchUser = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {

        await UserModel.updateOne(id, req.body)
        req.typeResponse = 200
        req.message = 'Usuario actualizado correctamente'

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}

export const deleteUser = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {

        await UserModel.deleteOne(id)
        req.typeResponse = 200
        req.message = 'Usuario eliminado correctamente'

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}