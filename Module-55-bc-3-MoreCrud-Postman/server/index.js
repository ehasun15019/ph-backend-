const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");

// import from mongodb clusters
const { MongoClient, ServerApiVersion } = require("mongodb");

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
    const productDB = client.db('product_DB');
    const productsCollection = productDB.collection('products')
    /* create collection end */

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
