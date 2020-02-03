const express = require('express')
const bodyParser = require('body-parser')


const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=> {
    res.end('Will send all the leader to you!')
})
.post((req,res,next)=> {
    res.end('Will add the leader:'+ req.body.name+ 'with details'+ req.body.description + 'to you.')
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('PUT operation is no supported in /leaders')
})
.delete((req,res,next)=> {
    res.end('Deleting all the leaders.')
});

//For dishId
leaderRouter.route('/:leaderId')
.get((req,res,next)=> {
    res.end('Will send details of dish:'+ req.params.leaderId+'to you.')
})
.post((req,res,next)=> {
    res.end('POST operation is not supported in dishes/'+ req.params.leaderId)
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.write('Updating the dish:'+ req.params.leaderId);
    res.end('Will update the dish'+ req.body.name+ 'with details: '+ req.body.description);
})
.delete((req,res,next)=> {
    res.end('Deleting dish:' + req.params.leaderId)
})

module.exports = leaderRouter