const express = require('express')

const bodyParser = require('body-parser')
const leaderRouter = express.Router()
const Leaders = require('../models/leaders')

leaderRouter.use(bodyParser.json())
leaderRouter.route('/')

.get((req,res,next)=> {
    Leaders.find({})
    .then((leaders)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err)=> next(err))
    .catch((err)=> console.log(err))
})
.post((req,res,next)=> {
    Leaders.create(req.body)
    .then((leader)=> {
        console.log('Leaders created',leader)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader)
    }, (err)=> next(err))
    .catch((err)=> console.log(err))
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('Put operation not supported in the leaders')
})
.delete((req,res,next)=> {
    Leaders.remove({})
    .then((resp)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(resp)
    }, (err)=> console.log(err))
    .catch((err)=> console.log(err))
})

// for /:leaderId

leaderRouter.route('/:leadersId')
.get((req,res,next)=> {
    Leaders.findById(req.params.leadersId)
    .then((leader)=> {
        console.log('Leader id', leader)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    }, (err)=> next(err))
    .catch((err)=> console.log(err))
})
.post((req,res,next)=> {
    res.statusCode = 403
    res.end('POST operation not supported in the /leaders/'+ req.params.leadersId )
})
.put((req,res,next)=> {
    Leaders.findByIdAndUpdate(req.params.leadersId, {
        $set: req.body
    }, {new:true})
    .then((leader)=> {
        console.log('leader id updated', leader)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    }, (err)=> next(err))
    .catch((err)=> console.log(err))

})
.delete((req,res,next)=> {
    Leaders.findByIdAndRemove(req.params.leadersId)
    .then((leader)=> {
        console.log('Leader deleted', leader)
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=> next(err))
    .catch((err)=> console.log(err))

})

module.exports = leaderRouter