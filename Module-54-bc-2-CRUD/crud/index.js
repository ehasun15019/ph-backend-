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
        
        /* coming from mongoDB docs start */
        const userDB = client.db('userDB');
        const userCollection = userDB.collection('users')
        /* coming from mongoDB docs end */


        // add database related api here 
        app.post("/users", async (req, res) => {
          // console.log("get the users. hit the post api")
          const getUser = req.body;
          console.log('user info', getUser);

          /* mongoDB docs says call your collection with await */
          const result = await userCollection.insertOne(getUser)
          res.send(result)
        })


        // this functionality is for read operation
        app.get("/users", async (req, res) => {
          const cursor = userCollection.find();
          const result = await cursor.toArray();
          res.send(result)
        })

        // delete operation
        app.delete('/users/:id', (req, res) => {
          console.log(req.params);
          console.log('delete a user from database');       
        })

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