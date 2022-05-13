require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// username:tour-advisor
// password:1TWsUC21uULtkC9N


const URI = process.env.uri;
const PORT = process.env.PORT;

mongoose
  .connect("mongodb+srv://tour-advisor:1TWsUC21uULtkC9N@cluster0.ifdja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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



app.use("/user", require("./routes/userRoutes"));
app.use("/hotel", require("./routes/hotelRoutes"));
app.use("/host", require("./routes/packegeRoutes"));
app.use("/admin", require("./routes/adminRoutes"));


app.listen(PORT, () => {
    console.log(`SERVER IS CONNECTED TO PORT ${PORT}`);
  });