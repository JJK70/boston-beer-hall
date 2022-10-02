import { Router } from 'express'
import * as beersCtrl from '../controllers/beers.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', beersCtrl.index)
router.get('/:id', beersCtrl.show)
router.post('/', beersCtrl.create)
router.post('/', isLoggedIn, beersCtrl.create)

export {
  router
}