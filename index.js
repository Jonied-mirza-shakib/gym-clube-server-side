const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT|| 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.GYM_CLUB_USERNAME}:${process.env.GYM_CLUB_PASSWORD}@cluster0.hcprikt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      client.connect();
      const programPricingCollection= client.db('gym-collection').collection('programPricing');
      const blogCollection= client.db('gym-collection').collection('blog');
      const galleryCollection= client.db('gym-collection').collection('gallery');
      const coachCollection= client.db('gym-collection').collection('coach');

      app.post('/programPricing', async(req, res) => {
        const programPricing=req.body;
        const result =await programPricingCollection.insertOne(programPricing);
        res.send(result)
      })
      app.get('/programPricing', async(req, res) => {
        const result = await programPricingCollection.find().toArray()
        res.send(result)
      })

    //   blog
    app.post('/blog', async(req, res) => {
        const blog=req.body;
        const result =await blogCollection.insertOne(blog);
        res.send(result)
      })
      app.get('/blog', async(req, res) => {
        const result = await blogCollection.find().toArray()
        res.send(result)
      })
    //   gallery
    app.post('/gallery', async(req, res) => {
        const gallery=req.body;
        const result =await galleryCollection.insertOne(gallery);
        res.send(result)
      })
      app.get('/gallery', async(req, res) => {
        const result = await galleryCollection.find().toArray()
        res.send(result)
      })
    //   coach
    app.post('/coach', async(req, res) => {
        const gallery=req.body;
        const result =await coachCollection.insertOne(gallery);
        res.send(result)
      })
      app.get('/coach', async(req, res) => {
        const result = await coachCollection.find().toArray()
        res.send(result)
      })





    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})