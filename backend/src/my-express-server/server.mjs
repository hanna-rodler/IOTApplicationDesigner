import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getFileName } from './utils/utils.mjs';
import {exportToJson, importFromJson, importFromJsonBE} from './jsonHandling.mjs';
import mappingsRouter from './../routes/routes.mjs'
import {MongoClient} from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

const uri = 'mongodb+srv://tobi:WWkjfLektNUm3QVM@iot-configuration.qoupblv.mongodb.net/?retryWrites=true&w=majority&appName=IoT-Configuration';

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true }));
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

app.post('/write-mqtt-file', (req, res) => {
    const formData = req.body;
    const fileName = getFileName(formData.discover_prefix);
    console.log(fileName, ' name');

    fs.writeFile(path.join(FILE_PREFIX, fileName), JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.log('Error writing file: ' + err);
            return res.status(500).json({ message: 'Failed to write file', error: err });
        }
        console.log('Successfully wrote file');
        res.status(200).json({ message: 'File written successfully' });
    });
});

app.get('/api/export/:id', exportToJson);

app.post('/import-test', importFromJsonBE);
app.post('/import', importFromJson);

app.get('/test2', (req, res) => {
    res.status(200).json('test is successful');
})

app.get('/test/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('getting export for project with id ', id);

        const myJsonObj = {
            "discover_prefix": "iotempower_static_value_export",
            "connection": {
                "keep_alive": 60,
                "client_id": "MQTT-Integrator",
                "clean_session": true,
                "will_topic": "will/topic",
                "will_message": "Last Will",
                "will_qos": 0,
                "will_retain": false,
                "username": "Username",
                "password": "Password"
            }
        }

        res.status(200).json(myJsonObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to export project'});
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});