const port = 4008;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());
console.log("Middleware loaded: express.json(), cors()");


mongoose.connect("mongodb+srv://kavindu:Kavindu2000@cluster0.g9sbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB connection successful"))
.catch((err) => console.log("MongoDB connection error:", err));


app.get("/", (req, res) => {
    console.log("GET / - Root route accessed");
    res.send("express app is running");
  });

  // Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Multer storage destination function called");
    cb(null, "./upload/images");
  },
  filename: (req, file, cb) => {
    console.log("Multer filename function called");
    const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    console.log(`Generated filename: ${filename}`);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
console.log("Multer configured for file uploads");


app.use("/images", express.static("upload/images"));


// Creating upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  console.log("POST /upload - Upload endpoint hit");

  // Check if a file is uploaded
  if (!req.file) {
    console.log("No file uploaded in the request");
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  // Log the uploaded file details
  console.log("Uploaded file details:", req.file);

  // Send success response
  const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
  console.log(`Image URL: ${imageUrl}`);

  res.json({
    success: 1,
    image_url: imageUrl,
  });
});

//Schema for creating product
const Product= mongoose.model("Product",{
  id:{
    type: Number,
    required:true,
  },
  name:{
    type:String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required:true,
  },
  new_price:{
    type:Number,
    required:true,

  },
  old_price:{
    type:Number,
    required:true,
  },
  // date:{
  //   type:Date,
  //   default:Date.now,
  // },
  // available:{
  //  type:Boolean,
  //  default:true,
  // },
})

app.post('/addproduct', async (req, res) => {
  try {
    // Fetch existing products and calculate the new id
    const products = await Product.find({});
    //const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    let id;
    if(products.length>0){
      let last_product_array=products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id+1;
    }
    else{
      id=1;
    }
    // Create a new product instance
    const product = new Product({
      id: id, // Auto-generated id
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    // Save the product to the database
    await product.save();

    // Log the product instance
    console.log("Product saved successfully:", product);

    // Send a success response
    res.json({
      success: true,
      name:req.body.name,
    });
  } catch (err) {
    // Log any errors
    console.error("Error saving product:", err.message);

    // Send an error response
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});


// creating API for deleting product
app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("removed");
  res.json({
    success:true,
    name:req.body.name,
  })
  })
  
  //creating API for getting all products
  
  app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("Products fetched:", products); // Debugging log
    res.send(products);
  });

  const Users= mongoose.model('Users',{
    name:{
      type:String,
  
    },
    email:{
      type:String,
      unique:true,
    },
  
    password:{
      type:String,
  
    },
    cartData:{
      type:Object,
    },
    data:{
      type:Date,
      default:Date.now,
    }
  })
  
  //creating endpoint for registering user
  
  app.post('/signup',async(req,res)=>{
    let check= await Users.findOne({email:req.body.email});
  
    if(check){
      return res.status(400).json({success: false, errors:"existing user found with same email address"})
    }
    let cart= {};
    for(let i=0;i<300; i++)
    {
     cart[i]=0;
    }
    const user= new Users({
      name:req.body.username,
      email:req.body.email,
      password:req.body.password,
      cartData:cart,
  
    })
    await user.save();
  
    const data= {
      user:{
        id: user.id
      }
    }
  
    const token =jwt.sign(data, 'secret_ecom ');
    res.json({success:true, token})
  
  })
  
  //creating endpoint for userlogin
  
  app.post('/login',async(req,res)=>{
      let user= await Users.findOne({email:req.body.email});
      if(user)
      {
        const passCompare= req.body.password===user.password;
        if(passCompare)
        {
          const data={
            user: {
              id:user.id
            }
          }
  
          const token=jwt.sign(data,'secret_ecom');
          res.json({success:true, token});
        }
  
        else{
          res.json({success:false, errors:"wrong password"});
        }
      }
      else{
        res.json({success:false,errors:"wrong email id"})
      }
  })
  
  //creating endpoint for new collection
  
  app.get('/newcollection',async(req,res)=>{
        let products= await Product.find({});
        let newcollection= products.slice(1).slice(-8);
        console.log("Newcollection fetched");
        res.send(newcollection);
  })
  
  //creating endpoint for popular women
  
  app.get('/popularinwomen',async(req,res)=>{
    let products= await Product.find({category:"women"});
    let popular_in_women= products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
  })
  //creating middleware to fetch user
  
  const fetchuser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
      res.status(401).send({errors:"please use valid token"})
    }
    else{
      try{
        const data= jwt.verify(token, 'secret_ecom');
        req.user=data.user;
        next();
  
      }catch(error)
      {
          res.status(401).send({errors:"please authenticate using valid details"});
      }
    }
  
  }
  //creating endpoint for adding cart data
  
  app.post('/addtocart',fetchuser,async(req,res)=>{
    let userData= await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
   // let popular_in_women= products.slice(0,4);
    //console.log(req.body, req.user);
   // res.send(popular_in_women);
  })
  
  //creating endpint to remove product from cartdata
  
  app.post('/removefromcart', fetchuser,async(req,res)=>{
    console.log("removed", req.body.itemId)
    let userData= await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("removed")
  })
  


app.listen(port, (error) => {
    if (!error) {
      console.log(`Server running on port ${port}`);
    } else {
      console.log("Error starting server:", error);
    }
  });