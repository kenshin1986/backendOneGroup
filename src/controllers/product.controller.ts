import { Request, Response, NextFunction } from 'express'
import ProductModel, { IProduct } from '../models/product.model'

export interface RequestNext extends Request {
    message: string,
    error: string,
    json: any,
    typeResponse: number,
}

export const getProducts = async (req: any, res: Response, next: NextFunction) => {
    const { $limit, $skip } = req.query
    const limit = parseInt($limit) || 10
    const skip = parseInt($skip) || 0
    try {
        const products = await ProductModel.find().limit(limit).skip(skip);

        req.typeResponse = 200
        req.json = {
            limit,
            skip,
            total: (await ProductModel.find()).length,
            data: products,
        }
    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}

export const postProduct = async (req: any, res: Response, next: NextFunction) => {
    const { name } = req.body
    try {
        if (name) {
            const productSelected = await ProductModel.findOne({ name })
            if (!productSelected) {
                const newProduct = new ProductModel(req.body)
                await newProduct.save()
                const products = await ProductModel.find().limit(10).skip(0);

                req.typeResponse = 200
                req.json = {
                    limit: 10,
                    skip: 0,
                    total: (await ProductModel.find()).length,
                    data: products,
                }
            } else {
                req.typeResponse = 400
                req.message = "Producto ya registrado"
            }
        } else {
            req.typeResponse = 400
            req.message = "El parámetro name es obligatorio"
        }

    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()
}

export const getProductId = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        if (id) {
            const productSelected = await ProductModel.findById(id)
            req.typeResponse = 200
            req.json = productSelected

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

export const getProductsLike = async (req: any, res: Response, next: NextFunction) => {
    const { name } = req.params
    try {
        if (name) {
            const productSelected = await ProductModel.find({ name: { $regex: `.*${name}.*` } })
            req.typeResponse = 200
            req.json = productSelected

        } else {
            req.typeResponse = 400
            req.message = "El parámetro name es obligatorio"
        }
    } catch (error) {
        req.typeResponse = 500
        req.error = error
    }
    next()

}

export const patchProduct = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        if (id) {
            await ProductModel.updateOne(id, req.body)
            req.typeResponse = 200
            req.message = 'Producto actualizado correctamente'
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

export const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        if (id) {
            await ProductModel.deleteOne(id)
            req.typeResponse = 200
            req.message = 'Producto eliminado correctamente'
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