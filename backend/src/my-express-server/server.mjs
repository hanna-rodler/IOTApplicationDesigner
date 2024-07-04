import express from 'express';
import cors from 'cors';
import { exportToJson, importFromJson } from './jsonHandling.mjs';
import mappingsRouter from './../routes/routes.mjs';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;


const uri = process.env.API_URL;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

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

app.use('/api/projects', mappingsRouter);

app.get('/api/export/:id', exportToJson);
app.post('/api/import', importFromJson);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
