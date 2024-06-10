import { Router } from 'express';
import {ObjectId} from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = "projects";

// Create a new project
router.post('/', async (req, res) => {
    try {
        const project = {
            name: req.body.name,
            topics: [],
            dialog: [],
            edges: [],
            mappings: []
        };
        const result = await req.db.collection(PROJECTS_COLLECTION).insertOne(project);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await req.db.collection(PROJECTS_COLLECTION).find().toArray();
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get projects' });
    }
});

// Get a specific project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get project' });
    }
});

// Update a project by ID
router.put('/:id', async (req, res) => {
    try {
        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await req.db.collection(PROJECTS_COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});


export default router;



/*

import { Router } from 'express';
import { Mapping } from '../models/routes.mjs';

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
import { Mapping } from '../models/routes.mjs';

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