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


const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;   // ✅ from middleware

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountverified) {
      return res.json({
        success: false,
        message: "Account already verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Verification OTP sent to email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//// VERIFY THE EMAIL USING OTP
const verifyEmail=async(req,res)=>{
  // const {userId,otp}=req.body;
  const userId = req.user.id;
const { otp } = req.body;
 

  if(!userId || !otp){
   return res.json({success:false,message:"Missing values"})
  }
  try{
    const user=await userModel.findById(userId);

    if(!user){
      return res.json({success:false,message:"User not exist"});
    }
   if (!user.verifyOtp || String(user.verifyOtp) !== String(otp)) {
  return res.json({ success:false, message:"Invalid OTP" });
}

    if(user.verifyOtpExpireAt<Date.now()){
      return res.json({success:false,message:"Expire Otp"})
    }
    user.isAccountverified=true;
    user.verifyOtp="";
    user.verifyOtpExpireAt=0;
    await user.save();
    return res.json({success:true, message:"email verified successfully"})
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





/////SEND PASSWORD RESET OTP
const sendResetOtp=async(req,res)=>{
  const{email}=req.body;
  if(!email){
    return res.json({success:false,message:"Email is required"})
  }
  try{
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"user not found"})
    }
     const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 *  1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "password reset OTP",
      text: `Your reset OTP is ${otp}. Used this opt to reset your password.`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({success:true,message:"otp send to your email"})
  }catch(error){
    return res.json({success:false,message:error.message})
  }
}

////RESET YOUR PASSWORD
const resetPassword=async(req,res)=>{
  const{email,otp,newPassword}=req.body;
  if(!email || !otp || !newPassword){
    return res.json({success:false,message:"Email,otp,New Password is required"});
  }
  try{
    const user= await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User Does not exist"})
    }
    if(user.resetOtp==="" || user.resetOtp!==otp){
      return res.json({success:false,message:"Invalid otp"})
    }
    if(user.resetOtpExpireAt<Date.now()){
      return res.json({success:false,message:"Otp Expired"})
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword
    user.resetOtp=""
    user.resetOtpExpireAt=0
    await user.save();
    return res.json({success:true,message:"Your reset password is changed successfully"})
  }catch(error){
    return res.json({success:false,message:error.message})
  }
}

module.exports = { register,login,logout,sendVerifyOtp,verifyEmail,isAuthenticated, sendResetOtp ,resetPassword};
