import { Request, Response } from 'express'
import { RequestNext } from '../controllers/user.controller'
import LogModel from '../models/log.model'

export const saveLogs = async (req: any, res: Response) => {
    const { message, error, method, path, body, params, json, typeResponse } = req
    const response = { ...json, message, error }

    const dataLog = {
        typeRequest: method,
        endPoint: path,
        body,
        params,
        typeResponse,
        response,
    }
    const newLog = new LogModel(dataLog)
    try {
        //await newLog.save();
        res.status(typeResponse).send(response)
    } catch (error) {
        res.status(500).send({ error })
    }
}