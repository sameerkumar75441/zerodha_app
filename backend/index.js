require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cookieParser = require("cookie-parser");


const HoldingsModel=require("./model/HoldingsModel");
const Positionsmodel = require("./model/PositionsModel");
const Ordersmodel=require("./model/OrdersModel");
const authRouter = require("./Routes/authRoutes.js");
const PORT=process.env.PORT|| 8080;
const url = process.env.MONGO_URL;
const connectDb=require("./config/mongodb.js")
// const bodyParser=require("body-parser");
const cors=require("cors");
const { userRouter } = require("./Routes/userRoute.js");
// const allowedOrigins=["http://localhost:5173", "https://zerodha-clone-1-fevn.onrender.com"]

// app.use(cors({origin:allowedOrigins,credentials:true}));


const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// app.use(bodyParser.json());
 app.use(express.json()); 
 app.use(cookieParser())


 
mongoose.connect(url)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


 
app.get("/addsholding",async(req,res)=>{
 
  let tempHolding=[
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
  {
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
  },
  {
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
  {
    name: "RELIANCE",
    qty: 1,
    avg: 2193.7,
    price: 2112.4,
    net: "-3.71%",
    day: "+1.44%",
  },
  {
    name: "SBIN",
    qty: 4,
    avg: 324.35,
    price: 430.2,
    net: "+32.63%",
    day: "-0.34%",
    isLoss: true,
  },
  {
    name: "SGBMAY29",
    qty: 2,
    avg: 4727.0,
    price: 4719.0,
    net: "-0.17%",
    day: "+0.15%",
  },
  {
    name: "TATAPOWER",
    qty: 5,
    avg: 104.2,
    price: 124.15,
    net: "+19.15%",
    day: "-0.24%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 1,
    avg: 3041.7,
    price: 3194.8,
    net: "+5.03%",
    day: "-0.25%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 4,
    avg: 489.3,
    price: 577.75,
    net: "+18.08%",
    day: "+0.32%",
  },
];


  const count = await HoldingsModel.countDocuments();
  if (count === 0) {
    await HoldingsModel.insertMany(tempHolding);
    res.send("Holdings added successfully 🎉");
  } else {
    res.send("Holdings already exist ✅");
  }
})


 
app.get("/addsposition",async(req,res)=>{
  let tempPosition=[
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];
const count=await Positionsmodel.countDocuments();
if(count===0){
  await Positionsmodel.insertMany(tempPosition)
  res.send("Position added successfully")
}else{
  res.send("Postion added successfuly")
}
})

 
app.get("/allHoldings",async(req,res)=>{
  let allHoldings=await HoldingsModel.find({});
  res.json(allHoldings)
})

app.get("/allPositions",async(req,res)=>{
  let allPositions=await Positionsmodel.find({});
  res.json(allPositions);
})

 
app.post("/newOrder", async (req, res) => {
  console.log("BODY:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("No JSON body received ❌");
  }

  const { name, qty, price, mode } = req.body;

  try {
    const newOrder = new Ordersmodel({
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();
    res.status(201).send("Order Placed Successfully ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error ❌");
  }
});


// API END POINTS
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
  console.log("App working");
  res.send("Good")

})

app.listen(PORT, () => {
  console.log("App is Started");
});


