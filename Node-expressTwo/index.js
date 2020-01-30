const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const dishRouter = require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter')
const leaderRouter = require('./routes/leaderRouter')

const hostname = 'localhost'
const port = 3000;

const app = express()
app.use(morgan('dev'))

app.use('/dishes',dishRouter)
app.use('/promotion',promoRouter)
app.use('/leaders',leaderRouter)


app.use(express.static(__dirname + '/public'))
app.use((req,res,next)=> {
    console.log(req.headers)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html')
    res.end('<html><body><h2>This is the Best Express server</h2></body></html>')
})

const server = http.createServer(app)
server.listen(port,hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`)
})