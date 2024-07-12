const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./Router/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend's origin
    credentials: true, // to support cookies
  })
);
app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
