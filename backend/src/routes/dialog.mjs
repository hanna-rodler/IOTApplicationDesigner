import { Router } from 'express';
import {getDB} from "../database/database.mjs";

const router = Router();

router.post('/api/mappings', async (req, res) => {
    const mappingData = req.body;
    try {
        const db = getDB();
        const result = await db.collection('mappings').insertOne(mappingData);
        const newMapping = { _id: result.insertedId, ...mappingData };
        res.status(201).json(newMapping);
        console.log("Data saved");
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
        const db = getDB();
        const mappings = await db.collection('mappings').find({}).toArray();
        res.status(200).json(mappings);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
});

export default router;



/*

import { Router } from 'express';
import { Mapping } from '../models/dialog.mjs';

const router = Router();

router.post('/', async (req, res) => {
    const mappingData = req.body;

    try {
        const newMapping = new Mapping(mappingData);
        await newMapping.save();
        res.status(201).json(newMapping);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
});

router.get('/', async (req, res) => {
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

export default router;




import { Router } from 'express';
import { Mapping } from '../models/dialog.mjs';

const router = Router();

router.post('/', async (req, res) => {
    const mappingData = req.body;
    try {
        const newMapping = new Mapping(mappingData);
        await newMapping.save();
        res.status(201).json(newMapping);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }

    }
});

router.get('/', async (req, res) => {
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

export default router;
*/