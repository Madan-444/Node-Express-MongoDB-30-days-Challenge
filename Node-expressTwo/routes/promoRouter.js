const express = require('express')

const bodyParser = require('body-parser')
const promoRouter = express.Router()

promoRouter.use(bodyParser.json())
promoRouter.route('/')

.all((req,res,next)=> {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    next()
})
.get((req,res,next)=> {
    res.end('Will send all the promos to you !')
})
.post((req,res,next)=> {
    res.end('Will add the promo: ' +req.body.name + 'with details: ' + req.body.description)
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('Put operation not supported in the promos')
})
.delete((req,res,next)=> {
    res.end('Deleting all the promos')
})

// for /:promoId

promoRouter.route('/:promoId')
.get((req,res,next)=> {
    res.end('Will send details of promo: ' + req.params.promoId + ' to you.')
})
.post((req,res,next)=> {
    res.statusCode = 403
    res.end('POST operation not supported in the /promotion/'+ req.params.promoId )
})
.put((req,res,next)=> {
    res.write('Updating the promotion: '+ req.params.promoId + '')
    res.write('Updating the promotion: '+ req.params.promoId)
    res.end('Will update the promotion: ' + req.body.name + 'withe details:' + req.body.description)
})
.delete((req,res,next)=> {
    res.end('Deleting promotion: '+ req.params.promoId)
})

module.exports = promoRouter