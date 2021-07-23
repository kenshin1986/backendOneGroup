import { Request, Response } from 'express'
import LogModel from '../models/log.model'

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await LogModel.find()
        res.status(200).send({ total: logs.length, data: logs })
    } catch (error) {
        res.status(500).send({ error })
    }
}

export const generateExcel = async (req: Request, res: Response) => {

    res.status(500).send({ error: 'error' })
}