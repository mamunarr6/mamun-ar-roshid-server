const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qzuhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('mamunArRoshid')
        const projectsCollection = database.collection('projects')

        //get all projects
        app.get('/projects', async (req, res) => {
            const cursor = projectsCollection.find({})
            const result = await cursor.toArray();
            res.json(result);
        })

        //get on projects
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const result = await projectsCollection.findOne({ _id: ObjectId(id) })
            res.json(result)
        })

    }
    finally {
        // client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`mamun ar roshid server running ${port}`)
})