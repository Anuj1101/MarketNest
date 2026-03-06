const app=require('./src/app.js')
const dotenv=require('dotenv')
dotenv.config()
const connectDb = require('./src/config/db.js')
connectDb(process.env.MONGO_URI);
app.listen(4000,()=>{console.log('hii server is running')})