const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
// come from mongo clusters
const { MongoClient, ServerApiVersion } = require('mongodb');

// cors requirer
const cors = require('cors');

// middleware setup
app.use(cors());
app.use(express.json());

// mongoDB uri
const uri = "mongodb+srv://simpleDBUser:CnoErlcaT5W4STuH@ic-cluster.qdhi4wp.mongodb.net/?appName=ic-cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function run() {
    try{
        await client.connect();
        await client.db('admin').command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
   finally {
    // await client.close()
   }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})


/*
* CnoErlcaT5W4STuH
* simpleDBUser
*/