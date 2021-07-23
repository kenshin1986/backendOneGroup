import { Router } from 'express'
import { deleteUser, getUsers, patchUser, postUser } from '../controllers/user.controller'

const router = Router()


router.get('/', getUsers)

router.patch('/:id', patchUser)

router.post('/', postUser)

router.delete('/:id', deleteUser)

export default router