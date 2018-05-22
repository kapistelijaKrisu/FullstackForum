const router = require('express').Router()

router.get('/', async (request, response) => {
        response.json('dis a root to get rid of an error')
})
module.exports = router