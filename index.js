require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const model = require("./productSchema/product");
const Product = model.Product;
const productRouter = require("./routes/productRoute");
const port = process.env.PORT || 5000;

//mongodb datatbase
main().catch((error) => {
  console.log(error);
});
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected successfully");
}

//body praser
app.use(express.json());
app.use("/product", productRouter.router);

//server
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
