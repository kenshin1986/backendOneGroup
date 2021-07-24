import { Router } from 'express'
import passport from 'passport'
import { deleteUser, getUsers, patchUser, signIn, signUp } from '../controllers/user.controller'

const router = Router()


router
    .get('/', passport.authenticate('jwt', { session: false }), getUsers)

router.patch('/:id', passport.authenticate('jwt', { session: false }), patchUser)

router
    .post('/signup', signUp)
    .post('/', signIn)

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser)

export default router