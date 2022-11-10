const express = require ('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    }
    finally{

    }
} 

run().catch(er=>console.log(er));


app.get('/', (req,res) => {
    res.send('hello from mongo server');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})