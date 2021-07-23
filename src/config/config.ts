export default {
    JWTSECRET:process.env.JWT_SECRET || 'secrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/digital-soluciones',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    }
}