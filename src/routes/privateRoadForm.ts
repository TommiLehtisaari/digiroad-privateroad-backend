import { Router, Request, Response } from 'express'
import validate from '../middleware/privateRoadValidator'
const router = Router()

router.post('/', [validate], async (req: Request, res: Response) => {
  res.send(req.body)
})

export default router
