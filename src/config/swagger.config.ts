export default {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api Rest',
            version: '1.0.0',
            description: 'Api Rest Information',

        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/swagger/*.ts']
}