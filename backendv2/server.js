const express=require('express')
require('dotenv').config()
const dbConnect=require('./src/configs/dbConnection')
const initRoutes = require('./src/routers')
const cookieParser = require('cookie-parser')
const cors=require('cors')

const app = express();

app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['POST', 'PUT','GET','DELETE']
}))
const port =process.env.PORT ||8888
app.use(express.json());
app.use(express.urlencoded({extended:true}))
dbConnect();
initRoutes(app);

app.use('/',(req, res)=>{res.send('SERVER ONNNN')})

app.listen(port,()=>{
    console.log('Server running on port :'+port)
})

