const express = require("express");
 const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const app = express();
app.use(express.json());
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const { connection } = require("./confige/confige");
const { UserModel } = require("./models/user.model");
const { authenticate } = require("./middleware/authenticate");
const { userRouter } = require("./routes/user.route");
const { authorise } = require("./middleware/authorise");
const { generateOtpRouter } = require("./routes/generateotpmail");
const { newtokenRouter } = require("./routes/newtoken");
const { ProjectRouter } = require("./routes/projects");
const {appointmentRouter}=require("./routes/sendMail");
// add Data To Backend
const {addRouter}=require("./routes/addDataToBackend")
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.json("Welcome");
});

app.use("/user", userRouter);

app.use(authenticate)
app.use("/product", ProjectRouter);
app.use("/", newtokenRouter);
app.use("/book", appointmentRouter)

//additional requirements
// app.use(authenticate)

//additional routers
app.use("/addDataToBackend",addRouter)
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log("Server on 8000");
});
