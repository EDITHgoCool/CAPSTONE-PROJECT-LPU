const express = require ("express")
const app =express();
const port=process.env.PORT || 3000

const ejs=require("ejs")

const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const { ensureAuthenticated, forwardAuthenticated } = require('./auth');
require("./db/conn.js")

 

const Register=require("./models/registers")
const Todo=require("./models/Todo")


app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('./views')); 

// Express session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false
    })
  );
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Register.findOne({
        email: email
      }).then(user => {

        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        if(password === user.password){
            return done(null, user);
        }else{
            return done(null, false, { message: 'Password incorrect' });   
        }
        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
        //   if (isMatch) {
        //     return done(null, user);
        //   } else {
        //     return done(null, false, { message: 'Password incorrect' });
        //   }
        // });
      });
    })
  );

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Register.findById(id, function(err, user) {
        done(err, user);
    });
});


app.get("/",(req,res)=>
{
    res.render("index")
})
app.get("/form",(req,res)=>
{
    res.render("form")
})



app.post("/mathgame3score", async(req,res)=>
{
    console.log(req.body.quickMathScore)
    try {

        // const registerData=new Register(
        //     {
        //         quicMath:req.body.quickMathScore,  
        //     }
        //     )
        //     const registered = await registerData.save();
        console.log(req.user.email)
        const user = Register.findOne({email:req.user.email});
        const update = { quickMathScore: req.body.quickMathScore};
       
        
        await user.updatOne(update);
       
        // await register.updateOne({email:req.user.email},{quickMathScore:quickMathScore})
            
        
    } catch (error) {
        res.send(error)
    }
})
app.post("/mathapp2Score", async(req,res)=>
{
    console.log(req.body.mathapp2Score)
    try {

        console.log(req.user.email)
        const user = Register.findOne({email:req.user.email});
        const update = { mathapp2Score: req.body.mathapp2Score};
       
        
        await user.updatOne(update);
            
        
    } catch (error) {
        res.send(error)
    }
})
app.post("/mathappScore", async(req,res)=>
{
    console.log(req.body.mathapp1Score)
    try {

        console.log(req.user.email)
        const user = Register.findOne({email:req.user.email});
        const update = { mathapp1Score: req.body.mathapp1Score};
       
        
        await user.updatOne(update);
            
        
    } catch (error) {
        res.send(error)
    }
})
// app.post("/mathgame1score", async(req,res)=>
// {
//     console.log(req.body.quickMathScore)
//     try {

//         // const registerData=new Register(
//         //     {
//         //         quicMath:req.body.quickMathScore,  
//         //     }
//         //     )
//         //     const registered = await registerData.save();
//         console.log(req.user.email)
//         const user = Register.findOne({email:req.user.email});
//         const update = { mathapp1score: req.body.mathapp1score};
//         await user.updateOne(update);
//         // await register.updateOne({email:req.user.email},{quickMathScore:quickMathScore})
            
        
//     } catch (error) {
//         res.send(error)
//     }
// })


app.get("/mathapp1",(req,res)=>
{
    res.render("mathapp1")
})

app.get("/mathapp2",(req,res)=>
{
    res.render("mathapp2",{mathapp2Score:req.user.mathapp2Score})
})

app.get("/memory",(req,res)=>
{
    res.render("memory")
})

app.get("/memory2",(req,res)=>
{
    res.render("memory2")
})

app.get("/memoryblock",(req,res)=>
{
    res.render("memoryblock")
})
app.get("/simon",(req,res)=>
{
    res.render("simon")
})

app.get("/tictactoe",(req,res)=>
{
    res.render("tictactoe")
})
app.get("/tictactoe2",(req,res)=>
{
    res.render("tictactoe2")
})
app.get("/game2048",(req,res)=>
{
    res.render("game2048")
})

app.get("/mathgame3",(req,res)=>
{
    console.log(req.user)

    res.render("mathgame3",{quickMathScore:req.user.quickMathScore})
    
})
app.get("/math-page",(req,res)=>
{
    res.render("math-page")
})
app.get("/Tic-page",(req,res)=>
{
    res.render("Tic-page")
})
app.get("/Brain-page",(req,res)=>
{
    res.render("Brain-page")
})
app.get("/habit",(req,res)=>
{
    res.render("habit")
})
app.get("/profile",(req,res)=>
{
    res.render("profile",{name:req.user.firstName + " "+req.user.lastName})
})


app.get("/home",ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("home",{name:req.user.firstName + " "+req.user.lastName})
})

app.get("/Todo",ensureAuthenticated, async(req, res) => {
    const allTodo = await Todo.find();
    res.render("Todo", {todo: allTodo})
})

 
app.post("/add/todo",(req,res)=>
{
    const {todo}=req.body;
    const newTodo= new Todo({todo})

    //saving the todos

    newTodo.save()
    .then(()=>
    {
        console.log("Successfully added!")
        res.redirect("/Todo")
    })
    .catch((err)=> console.log(err))
})
app.get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/Todo");
      })
      .catch((err) => console.log(err));
  });


app.post('/formlogin', passport.authenticate('local', {
successRedirect : '/home',
failureRedirect: '/form',
failureFlash: false
}))
app.post('/logout',  (req, res) => {
    req.logout();
    res.render('form');
})
app.post("/form", async(req,res)=>
{
    try {
        if(req.body.password===req.body.cPassword)
        {
        const registerData=new Register(
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                cPassword:req.body.cPassword
            }
            )
            const registered = await registerData.save();
            res.status(201).redirect("/form");
        }
        else{res.send("passwords aren't matching!")}
        
        
       
        
    } catch (error) {
        res.send(error)
    }
})


app.listen(port,()=>
{
    console.log(`Server is runnig at ${port}`)
})