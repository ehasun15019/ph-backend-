const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

// import from mongodb clusters
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware 
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = "mongodb+srv://phModule55:bWNzs56kHLuFLwzX@ic-cluster.qdhi4wp.mongodb.net/?appName=ic-cluster";

// import from mongodb clusters
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

// this function is calling for mongodb


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
