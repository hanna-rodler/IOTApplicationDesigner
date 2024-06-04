import { Router } from 'express';
import {ObjectId} from "mongodb";

const router = Router();
const NOTES_COLLECTION = "mappings";

router.post('/', async (req, res) => {
    try {
        res.json(
            await req.db.collection(NOTES_COLLECTION).insertOne(req.body)
        );
    } catch(error) {
        console.log(error);
    }
});

router.get('/', async (req, res) => {
    try {
        res.json(
            await req.db.collection(NOTES_COLLECTION).find().toArray()
        );
    } catch(error) {
        console.log(error);
    }
});

router.delete('/:id', async (req,res,next) => {
    try {
        res.json(
            await req.db.collection(NOTES_COLLECTION).deleteOne(
                {_id: new ObjectId(req.params.id)}
            )
        );
    } catch(error) {
        console.log(error);
    }
});

router.put('/:id', async (req,res,next) => {
    try {
        res.json(
            await req.db.collection(NOTES_COLLECTION).updateOne(
                {_id: new ObjectId(req.params.id)},
                {$set: {contents: req.body.contents}}
            )
        );
    } catch(error) {
        console.log(error);
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