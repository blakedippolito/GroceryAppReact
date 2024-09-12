const express = require('express')
const router = express.Router()
const listController = require('../controllers/list')
// const { ensureAuth } = require('../middleware/auth')

// router.get('/', ensureAuth, listController.getItems)

router.get('/', listController.getItems)

router.get('/favorites', listController.getFavorites)

router.post('/addItem', listController.addItem)

router.post('/addFavorite', listController.addFavorite)

router.delete('/removeFavorite', listController.removeFavorite)

router.delete('/deleteItem', listController.deleteItem)

router.put('/markComplete', listController.markComplete)

router.put('/markIncomplete', listController.markIncomplete)

module.exports = router