import { Router } from 'express'
import * as beersCtrl from '../controllers/beers.js'

const router = Router()

router.get('/', beersCtrl.index)

export {
  router
}