import express, {Router} from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {connectDB} from "../database/database.mjs";
import {getFileName} from './utils/utils.mjs';
import {Mapping} from "../models/dialog.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // const PORT = process.env.PORT || 5000;
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define your routes directly in the server file
const router = Router();

router.post('/api/mappings', async (req, res) => {
    const mappingData = req.body;
    try {
        const newMapping = new Mapping(mappingData);
        await newMapping.save();
        res.status(201).json(newMapping);
        console.log("data saved");
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
});

router.get('/api/mappings', async (req, res) => {
    try {
        const mappings = await Mapping.find({});
        res.status(200).json(mappings);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
});

router.post('/write-mqtt-file', (req, res) => {
    const formData = req.body;

    const fileName = getFileName(formData.discover_prefix);

    console.log(fileName, ' name');

    fs.writeFile(path.join(FILE_PREFIX, fileName), JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.log('error writing file: ' + err);
            return res.status(500).json({ message: 'Failed to write file', error: err });
        }
        console.log('Successfully wrote file');
        res.status(200).json({ message: 'File written successfully' });
    });
});

// Use the router
app.use(router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});