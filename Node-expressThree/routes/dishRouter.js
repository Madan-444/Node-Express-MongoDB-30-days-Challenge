const express = require('express')
const bodyParser = require('body-parser')


const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=> {
    res.end('Will send all the dishes to you!')
})
.post((req,res,next)=> {
    res.end('Will add the dish:'+ req.body.name+ 'with details'+ req.body.description + 'to you.')
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('PUT operation is no supported in /dishes')
})
.delete((req,res,next)=> {
    res.end('Deleting all the dishes.')
});

//For dishId
dishRouter.route('/:dishId')
.get((req,res,next)=> {
    res.end('Will send details of dish:'+ req.params.dishId+'to you.')
})
.post((req,res,next)=> {
    res.end('POST operation is not supported in dishes/'+ req.params.dishId)
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.write('Updating the dish:'+ req.params.dishId);
    res.end('Will update the dish'+ req.body.name+ 'with details: '+ req.body.description);
})
.delete((req,res,next)=> {
    res.end('Deleting dish:' + req.params.dishId)
})

module.exports = dishRouter