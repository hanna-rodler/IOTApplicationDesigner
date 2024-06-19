import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getFileName } from './utils/utils.mjs';
import {exportToJson, importFromJson} from './jsonHandling.mjs';
import mappingsRouter from './../routes/routes.mjs'
import {MongoClient} from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

const uri = 'mongodb+srv://tobi:WWkjfLektNUm3QVM@iot-configuration.qoupblv.mongodb.net/?retryWrites=true&w=majority&appName=IoT-Configuration';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// connect to db via middleware
app.use(async (req,res,next) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        req.db = client.db("test");
        console.log("DB Connection Success");
        next();
    } catch(error) {
        console.log("DB Connection Error "+ error);
    }
});

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

app.post('/export', exportToJson);

app.post('/import-test', importFromJson);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});