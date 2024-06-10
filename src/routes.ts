import { Request, Response, Router } from 'express'
import { AppDataSource } from './data-source'
import { User } from './entities/User'

const userRepository = AppDataSource.getRepository(User)

const routes = Router()

routes.get('/', async (req: Request, res: Response) => {
	return res.json('tudo certo')
})

routes.post('/usuarios', async (req: Request, res: Response) => {
	const { name, email, password } = req.body

	const newUser = userRepository.create({ name, email, password })
	await userRepository.save(newUser)

	return res.status(201).json({ ...newUser })
})

export default routes
