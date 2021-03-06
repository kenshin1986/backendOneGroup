import { Request, Response, NextFunction } from 'express'
import UserModel, { IUser } from '../models/user.model'
import { createToken } from '../services/jwt'

export interface RequestNext extends Request {
    message: string,
    error: string,
    json: any,
    typeResponse: number,
}
export const getCurrentUser = async (req: any, res: Response, next: NextFunction) => {
    delete req.user._doc.password
    req.typeResponse = 200
    req.json = req.user._doc
    next()
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
    const { email, password } = req.body
    try {
        if (email && password) {
            const userSelect = await UserModel.findOne({ email })
            if (!userSelect) {
                const newUser = new UserModel(req.body)
                const response: any = await newUser.save()
                delete response._doc.password
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
            req.message = "Los parámetros email y password son obligatorios"
        }

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}

export const signIn = async (req: any, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    try {
        if (email && password) {
            const userSelect = await UserModel.findOne({ email })
            const isMatch = await userSelect?.comparePassword(password)
            if (userSelect && isMatch) {
                delete userSelect.password
                req.typeResponse = 200
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
            req.message = "Los parámetros user y password son obligatorios"
        }
    } catch (error) {
        console.log(error);

        req.typeResponse = 500
        req.error = error
    }
    next()

}


export const patchUser = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        if (id) {
            await UserModel.updateOne(id, req.body)
            req.typeResponse = 200
            req.message = 'Usuario actualizado correctamente'
        } else {
            req.typeResponse = 400
            req.message = "El parámetro id es obligatorio"
        }

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}