import express, { Router } from 'express';
import cors from 'cors';
import {exportToJson, importFromJson } from './jsonHandling.mjs';
import mappingsRouter from './../routes/routes.mjs'
import {MongoClient} from "mongodb";

const app = express();
const PORT = 5000;

const uri = 'mongodb+srv://tobi:WWkjfLektNUm3QVM@iot-configuration.qoupblv.mongodb.net/?retryWrites=true&w=majority&appName=IoT-Configuration';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
//app.use(bodyParser.json());

// connect to db via middleware
let client;
let db;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db("test");
        console.log("DB Connection Success");
    }
    return db;
}

app.use(async (req, res, next) => {
    try {
        req.db = await connectToDatabase();
        next();
    } catch (error) {
        console.log("DB Connection Error: " + error);
        res.status(500).send("Database connection error");
    }
});

// app.use(async (req,res,next) => {
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         req.db = client.db("test");
//         console.log("DB Connection Success");
//         next();
//     } catch(error) {
//         console.log("DB Connection Error "+ error);
//     }
// });

app.use('/api/projects', mappingsRouter);

app.get('/api/export/:id', exportToJson);

app.post('/api/import', importFromJson);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});