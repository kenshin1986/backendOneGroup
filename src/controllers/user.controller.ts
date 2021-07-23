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
        console.log(response);
        req.typeResponse = 200
        req.json = { ...response._doc }
        req.message = 'Usuario actualizado correctamente'


    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}


export const patchUser = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {

        const response = UserModel.findByIdAndUpdate(id, req.body)
        console.log(response);

        /*  if (response.status === 200) {
              req.typeResponse = 200
              req.message = 'Usuario actualizado correctamente'
          } else {
              req.typeResponse = 400
              req.message = 'Usuario no encontrado'
          }*/

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    //next()
}

export const deleteUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${req.params.id}`, {
            method: 'DELETE',
            body: JSON.stringify(req.body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.status === 200) {
            req.typeResponse = 400
            req.message = 'Usuario eliminado correctamente'
        } else {
            req.typeResponse = 400
            req.message = 'Usuario no encontrado'
        }

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}