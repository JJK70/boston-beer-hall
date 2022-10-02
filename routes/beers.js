import { Router } from 'express'
import * as beersCtrl from '../controllers/beers.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', beersCtrl.index)
router.get('/:id', beersCtrl.show)
router.get('/:id/edit', isLoggedIn, beersCtrl.edit)
router.post('/', beersCtrl.create)
router.post('/', isLoggedIn, beersCtrl.create)
router.patch('/:id/flip-great', isLoggedIn, beersCtrl.flipGreat)
router.put('/:id', isLoggedIn, beersCtrl.update)

export {
  router
}