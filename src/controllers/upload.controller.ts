import { NextFunction } from "connect";
import { Response } from "express";

export interface RequestNext extends Request {
    message: string,
    error: string,
    json: any,
    typeResponse: number,
}

export const uploadImage = async (req: any, res: Response, next: NextFunction) => {
    const { file } = req

    try {
        if (file) {
            req.typeResponse = 200
            req.json = {
                path: file.filename,
                originalname: file.originalname,
                size: file.size,
            }
        } else {
            req.typeResponse = 400
            req.message = 'Error, formato no compatible'
        }
    } catch (error) {
        console.log(error);

        req.typeResponse = 500
        req.message = 'Error, formato no compatible'
    }
    next()
}