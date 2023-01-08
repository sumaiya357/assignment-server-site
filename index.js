const express = require ('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port =process.env.PORT || 5000;

// middlewire
app.use(cors());
app.use(express.json());

// user: dbuser3
// pass :BTDDWEuK9YGWC3uE




const uri = "mongodb+srv://dbuser3:BTDDWEuK9YGWC3uE@cluster0.cno8kmu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
      
    try{
        const userCollection = client.db('allCategory').collection('category');
        const reviewCollection = client.db('allCategory').collection('reviews');
     
        app.get('/category',async(req,res) => {
            const query= {};
            const cursor = userCollection.find(query)
        
        const category = await cursor.limit(3).toArray();
        res.send(category)
        })

        app.get('/allcategory',async(req,res) => {
            const query= {};
            const cursor = userCollection.find(query)
        
           const category = await cursor.toArray();
            res.send(category)
        })

        app.get('/allcategory/:id',async(req,res) => {
            const id = req.params.id;
            console.log(id);
            const query= {_id:ObjectId(id)}
            const cursor = userCollection.find(query)
           const category = await cursor.toArray();
            res.send(category);
        })

        app.get('/reviews',async(req,res) => {
            const query= {};
            const cursor = reviewCollection.find(query)
        
           const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally{
        
    }
} 

run().catch(err=>console.log(err));


app.get('/', (req,res) => {
    res.send('hello from mongo server for photography db');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})