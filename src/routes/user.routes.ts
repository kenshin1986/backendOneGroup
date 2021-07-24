import { Router } from 'express'
import { deleteUser, getUsers, patchUser, signIn, signUp } from '../controllers/user.controller'

const router = Router()


router
    .get('/', getUsers)

router.patch('/:id', patchUser)

router
    .post('/signup', signUp)
    .post('/', signIn)

router.delete('/:id', deleteUser)

export default router