const express = require('express')
const bodyParser = require('body-parser')


const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=> {
    res.end('Will send all the promos to you!')
})
.post((req,res,next)=> {
    res.end('Will add the promo:'+ req.body.name+ 'with details'+ req.body.description + 'to you.')
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.end('PUT operation is no supported in /promotions')
})
.delete((req,res,next)=> {
    res.end('Deleting all the promos.')
});

//For dishId
promoRouter.route('/:promotionId')
.get((req,res,next)=> {
    res.end('Will send details of dish:'+ req.params.promotionId+'to you.')
})
.post((req,res,next)=> {
    res.end('POST operation is not supported in promotion/'+ req.params.promotionId)
})
.put((req,res,next)=> {
    res.statusCode = 403;
    res.write('Updating the promo:'+ req.params.promotionId);
    res.end('Will update the promo'+ req.body.name+ 'with details: '+ req.body.description);
})
.delete((req,res,next)=> {
    res.end('Deleting dish:' + req.params.promotionId)
})

module.exports = promoRouter