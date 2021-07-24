import { Request, Response, NextFunction } from 'express'
import UserModel, { IUser } from '../models/user.model'

export interface RequestNext extends Request {
    message: string,
    error: string,
    json: any,
    typeResponse: number,
}

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
    const { $limit, $sort, $skip } = req.query
    const limit = parseInt($limit) || 10
    const skip = parseInt($skip) || 0
    try {
        const users = await UserModel.find().limit(limit).skip(skip).sort($sort);

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

export const postUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const newUser = new UserModel(req.body)

        const response: any = await newUser.save()
        req.typeResponse = 200
        req.json = { ...response._doc }
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