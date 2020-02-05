const express = require('express')

const bodyParser = require('body-parser')
const promoRouter = express.Router()
const Promotions = require('../models/promotions')
const authenticate = require('../authenticate')

promoRouter.use(bodyParser.json())
promoRouter.route('/')

.get((req,res,next)=> {
    Promotions.find({})
    .then((promotions)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(promotions)
    },(err)=> next(err))
    .catch((err)=> console.log(err));
})
.post(authenticate.verifyUser,(req,res,next)=> {
    Promotions.create(req.body)
    .then((promotion)=> {
        console.log('Promotion Created',promotion)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(promotion)
    },(err)=> next(err))
    .catch((err)=> console.log(err))
})
.put(authenticate.verifyUser,(req,res,next)=> {
    res.statusCode = 403;
    res.end('Put operation not supported in the /promotions')
})
.delete(authenticate.verifyUser,(req,res,next)=> {
    Promotions.remove({})
    .then((resp)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err)=> console.log(err))
    .catch((err)=> console.log(err))
})

// for /:promoId

promoRouter.route('/:promoId')
.get((req,res,next)=> {
    Promotions.findById(req.params.promoId)
    .then((promotion)=> {
        console.log('Promotion id', promotion)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion)
    }, (err)=> next(err))
    .catch((err)=> console.log(err))
   
})
.post(authenticate.verifyUser,(req,res,next)=> {
    res.statusCode = 403
    res.end('POST operation not supported in the /promotion/'+ req.params.promoId )
})
.put(authenticate.verifyUser,(req,res,next)=> {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new:true})
    .then((promotion)=> {
        console.log('promotion id updated', promotion)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion)
    }, (err)=> next(err))
    .catch((err)=> console.log(err))

})
.delete(authenticate.verifyUser,(req,res,next)=> {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promotion)=> {
        console.log('Promotion deleted', promotion)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(promotion)
    },(err)=> next(err))
    .catch((err)=> console.log(err))

})

module.exports = promoRouter