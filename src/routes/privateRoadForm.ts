import { Router, Response } from 'express'

const router = Router()

router.post('/', async (_, res: Response) => {
  res.send('Hello worls')
})

export default router
