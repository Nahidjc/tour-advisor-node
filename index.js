require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost/tour-advisor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });



  function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }



// app.use("/user", require("./routes/userRoutes"));
// app.use("/assesment", require("./routes/assesmentRoutes"));
// app.use("/admin", require("./routes/adminRoutes"));


app.listen(PORT, () => {
    console.log(`SERVER IS CONNECTED TO PORT ${PORT}`);
  });