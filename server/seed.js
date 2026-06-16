const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URI);
const Product = require("./models/product");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.deleteMany({});

    await Product.insertMany([
      {
        name: "Wireless Headphones",
        price: 2999,
        image: "https://picsum.photos/300?1",
        description: "Premium sound quality headphones"
      },
      {
        name: "Smart Watch",
        price: 4499,
        image: "https://picsum.photos/300?2",
        description: "Track fitness and notifications"
      },
      {
        name: "Gaming Mouse",
        price: 1299,
        image: "https://picsum.photos/300?3",
        description: "RGB gaming mouse"
      },
      {
        name: "Bluetooth Speaker",
        price: 1999,
        image: "https://picsum.photos/300?4",
        description: "Portable wireless speaker"
      }
    ]);

    console.log("Products Added Successfully");
    process.exit();
  })
  .catch((err) => console.log(err));