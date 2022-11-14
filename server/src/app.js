// 
const express = require("express");
const app = express();
const port = process.env.PORT || 8080
require("./model-connection/connection")
const Insta = require("./model-connection/PostModel")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs");
const path = require("path");

//Body parser -- middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));

// Routes
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/uploads")
    },
    filename :(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.post("/posts",upload.single("img"),(req,res)=>{
    console.log(req.body.author)
   const saveImage = new  Insta({
        img: "/uploads/" + req.file.filename,
        author:req.body.author,
        location:req.body.location,
        description:req.body.description
   })
saveImage.save().then((res)=>{console.log("Image is saved")})
.catch((e)=>{console.log(e.message)})
res.json({message:"Data posted successfully"})

// res.redirect("http://localhost:3000/instaclone")

})

app.get("/",(req,res)=>{
    res.send("Ok hii HEROKU");
})

app.get("/posts",async(req,res)=>{
    try{
        const allPost = await Insta.find();
       res.status(200).json(allPost.reverse());
    }catch(e){
        res.status(400).send(e.message);
    }
})



// app.post("/posts",async(req,res)=>{
// try{
// const {file,author,location,description} = req.body;
//     const newPost =  await Insta.create({
//         file:file,
//         author:author,
//         location:location,
//         description:description
        
// })
// res.redirect("http://localhost:3000/instaclone");
// }catch(e){
//     res.status(400).send(e.message)
// }
// })

app.listen(port,()=>{console.log(`The server is up at ${port}`)})
