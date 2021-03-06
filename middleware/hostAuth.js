const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const hostAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentication" });
      }
      
      req.user = user;
      const admin = await User.findOne({
        _id: user.id,
      });

      if (admin.role !== "host" ) {
        return res.status(400).json({ msg: "Packege Host Recources Access Denied." });
      
      }
      next();
      // req.mentor = mentor
     

    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = hostAdmin;