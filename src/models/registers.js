const mongoose = require("mongoose")

const peopleSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true 
        },
        lastName:{
            type:String,
            required:true 
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true 
        },
        cPassword:{
            type:String,
            required:true 
        },
        quickMathScore:{
            type:String
        },
        mathapp2Score:{
            type:String
        }
        ,
        mathapp1Score:{
            type:String, 
        }
        // solveTimer:{
        //     type:String, 
        // },
        // game2048:{
        //     type:String, 
        // },
        // numberMatch:{
        //     type:String, 
        // },
        // matchingGame:{
        //     type:String, 
        // },
        // simonGame:{
        //     type:String, 
        // },
        // memoryBlock:{
        //     type:String, 
        // }




     }
)

const Register = new mongoose.model("Register",peopleSchema); 

module.exports =Register ;