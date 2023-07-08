const express=require("express")
const app=express()

const cors=require('cors')

const{default:mongoose}=require('mongoose')

app.use(cors({origin:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json("hai there")
})

//user authentification auth
const userRoute=require('./routes/auth')
app.use("/api/users/",userRoute);

//Artists Routes
const artistRoutes=require("./routes/artist")
app.use("/api/artist/",artistRoutes)


//Albums Routes
const albumRoutes=require("./routes/album")
app.use("/api/albums/",albumRoutes)

//Songs Routes
const songRoutes=require("./routes/song")
app.use("/api/songs/",songRoutes)



mongoose.connect('mongodb+srv://nibin:root@cluster0.ahac6aj.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true})
mongoose.connection
.once("open",()=>{console.log("connected")})
.on("error",(error)=>console.log(error))


app.listen(4000,()=>console.log("listening to port 4000"));
