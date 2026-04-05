const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel.js");
const userModel = require("../model/UserModel.js");
const transporter=require("../config/nodemailer.js")

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup Request Body:", req.body);

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing values" });
  }

  try {
      console.log("Email received:", email);
    const exitingUser = await UserModel.findOne({ email });
    console.log("Existing User:", exitingUser);

    if (exitingUser) {
      return res.json({ success: false, message: "User Already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    // JWT TOKEN CREATE CREATE KR RAHE HAI

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // SET COOKIES
    // res.cookie == Server se browser me cookie set karta hai
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //SENDING WELCOME EMAIL
    const mailOptions={
      from:process.env.SENDER_EMAIL,
      to:email,
      subject:"Welcome to Zerodha",
      text:`welcome to Zerodha. Your account has been created with emailid: ${email}`
    }
    await  transporter.sendMail(mailOptions);
    return res.json({success:true})

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

/////////////      USER CONTROLLER FUNCTION

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});
    ///password is match then generate token
 res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({success:true})



  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
  
};

const logout=async(req,res)=>{
    try{
        res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        return res.json({success:true,message:"Successfully Logout"})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}






 const isAuthenticated = (req, res) => {
  return res.json({
    success: true,
    user: req.user, // userAuth middleware se aaya
  });
};







module.exports = { register,login,logout,isAuthenticated,};
