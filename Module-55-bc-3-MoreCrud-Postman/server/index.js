const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");

// import from mongodb clusters
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

// mongodb uri
const uri =
  "mongodb+srv://phModule55:bWNzs56kHLuFLwzX@ic-cluster.qdhi4wp.mongodb.net/?appName=ic-cluster";

// coming from mongodb clusters start
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    /* create collection start */
    const productDB = client.db("product_DB");
    const productsCollection = productDB.collection("products");
    /* create collection end */


    /* call a get method for getting all data */
    app.get("/products", async (req, res) => {
      // const projectFields = {title: 1, price_min: 1, price_max: 1, image: 1}

      // const cursor = productsCollection.find().sort({
      //   price_min: 1
      // }).skip(2).limit(3).project(projectFields);

      const cursor = productsCollection.find();

      const result = await cursor.toArray();
      res.send(result);
    });

    /* call a get method for single data */
    app.get("/products/:id", async (req, res) => {
      const productID = req.params.id;
      const query = {
        _id: new ObjectId(productID),
      };

      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    /* call a post method for sending data in mongoDB */
    app.post("/products", async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      res.send(result);
    });

    /* call a patch method for updating data */
    app.patch("/products/:id", async (req, res) => {
      const productID = req.params.id;
      const query = {
        _id: new ObjectId(productID),
      };

      const updateProducts = req.body;

      const update = {
        $set: {
          name: updateProducts.name,
          price: updateProducts.price,
        },
      };

      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    /* delete method functionality */
    app.delete("/products/:id", async (req, res) => {
      const productID = req.params.id;
      const query = {
        _id: new ObjectId(productID),
      };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Ping success MongoDB");
  } finally {
  }
}

run().catch(console.dir);
// coming from mongodb clusters end

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// this function is calling for mongodb

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
