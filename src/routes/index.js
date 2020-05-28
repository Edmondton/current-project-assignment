import { Router } from 'express'

const router = Router()
import user from './user'
import visit from './visit'

export default function routes(app) {
  app.use('/api', router);
  user(router);
  visit(router);
}
