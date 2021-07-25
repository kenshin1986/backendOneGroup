import { model, Schema, Document } from "mongoose";


export interface IProduct extends Document {
    name: string;
    price: number;
    image: string;
    score: number;
}

const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        trim: true,
        lowercase: true,
    },
    score: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true
    }
)

export default model<IProduct>('Product', productSchema);