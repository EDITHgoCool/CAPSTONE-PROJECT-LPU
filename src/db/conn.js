const mongoose =require("mongoose")
mongoose.connect("mongodb://localhost:27017/dbexp",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>
{
    console.log("connection seccess")
}).catch((error)=>
{
    console.log(`connection failed! : ${error}`)
})