import express from "express";
import cors from "cors";
import login from "./src/API/authentication.js";
import message from "./src/API/message.js";
import signup from "./src/API/signup.js";
import createProfile from "./src/API/createProfile.js";
import  {jwtVerify} from './src/API/APIhelpers/middleware.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.ENV_PORT || 3000;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api/ping", (req, res) => {
  res.send({
    msg: "Hello, World",
  });
});

app.use("/auth", login);
app.use("/contact", message);
app.use("/gradProfilePage", jwtVerify, createProfile);
app.use("/recrProfilePage", jwtVerify, createProfile);
app.use("/signup", signup);


// app.use("*", (req, res) => {
//   return res.status(404).json({ message: "not found" });
// });

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});