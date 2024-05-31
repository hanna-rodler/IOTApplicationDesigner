import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // const PORT = process.env.PORT || 5000;
const FILE_PREFIX = path.join(__dirname, 'mqttFiles');

app.use(express.json());
app.use(cors());

app.post('/write-mqtt-file', (req, res) => {
    const test = {
        discovery_prefix: "iotempower",
        connection: {
            keep_alive: 60,
            clean_session: true,
        },
    };

    fs.writeFile(path.join(FILE_PREFIX, 'test.json'), JSON.stringify(test, null, 2), (err) => {
        if (err) {
            console.log('error writing file: ' + err);
            return res.status(500).json({ message: 'Failed to write file', error: err });
        }
        console.log('Successfully wrote file');
        res.status(200).json({ message: 'File written successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});