const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
 const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.json({ success: false, message: "Not Authorized! Login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };   
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { userAuth };
