const express = require('express')

const bodyParser = require('body-parser')
const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())
leaderRouter.route('/')

.all((req,res,next)=> {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    next()
})
.get((req,res,next)=> {
    res.end('Will send all the leader to you !')
})
.post((req,res,next)=> {
    res.end('Will add the leader: ' +req.body.name + 'with details: ' + req.body.description)
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('Put operation not supported in the leaders')
})
.delete((req,res,next)=> {
    res.end('Deleting all the leaders')
})

// for /:leaderId

leaderRouter.route('/:leadersId')
.get((req,res,next)=> {
    res.end('Will send details of leaders: ' + req.params.leadersId + ' to you.')
})
.post((req,res,next)=> {
    res.statusCode = 403
    res.end('POST operation not supported in the /leaders/'+ req.params.leadersId )
})
.put((req,res,next)=> {
    res.write('Updating the leaders: '+ req.params.leadersId + '')
    res.write('Updating the leaders: '+ req.params.leadersId)
    res.end('Will update the leaders: ' + req.body.name + 'withe details:' + req.body.description)
})
.delete((req,res,next)=> {
    res.end('Deleting leaders: '+ req.params.leadersId)
})

module.exports = leaderRouter