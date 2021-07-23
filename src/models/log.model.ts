import { model, Schema, Document } from 'mongoose'

export interface ILog extends Document {
    typeRequest: string,
    endPoint: string,
    body: any,
    params: any,
    typeResponse: Number,
    response: any,
}

const logSchema = new Schema({
    typeRequest: {
        type: String,
        required: true,
    },
    endPoint: {
        type: String,
        required: true,
    },
    body: {
        type: Object,
    },
    params: {
        type: Object,
    },
    typeResponse: {
        type: Number,
        required: true,
    },
    response: {
        type: Object,
        required: true,
    }
},
    {
        timestamps: true
    }
)

export default model<ILog>('Logs', logSchema)