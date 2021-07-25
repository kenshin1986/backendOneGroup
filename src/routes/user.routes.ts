import { Router } from 'express'
import passport from 'passport'
import { getUsers, patchUser, signIn, signUp, getCurrentUser } from '../controllers/user.controller'

const router = Router()

router
    .get('/', passport.authenticate('jwt', { session: false }), getUsers)
    .get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser)

router.patch('/:id', passport.authenticate('jwt', { session: false }), patchUser)

router
    .post('/signup', signUp)
    .post('/signin', signIn)


export default router