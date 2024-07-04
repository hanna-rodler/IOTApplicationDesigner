import {Router} from 'express';
import {ObjectId} from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = "projects";

/************************
 creates a new project
 ***********************/
router.post('/', async (req, res) => {
    try {
        const project = {
            name: req.body.name,
            topics: {},
            dialog: req.body.dialog,
            edges: {},
            mappings: {},
            screenshot: req.body.screenshot || null
        };
        const result = await req.db.collection(PROJECTS_COLLECTION).insertOne(project);
        const insertedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: result.insertedId});
        res.status(200).json(insertedProject);
    } catch (error) {
        res.status(500).json({error: 'Failed to create project'});
    }
});

/*********************
 gets all projects
 ********************/
router.get('/', async (req, res) => {
    try {
        const projects = await req.db.collection(PROJECTS_COLLECTION).find().toArray();
        res.json(projects);
    } catch (error) {
        res.status(500).json({error: 'Failed to get projects'});
    }
});

/*********************************
 gets a specific project by ID
 ********************************/
router.get('/:id', async (req, res) => {
    try {
        const project = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: new ObjectId(req.params.id)});
        res.json(project);
    } catch (error) {
        res.status(500).json({error: 'Failed to get project'});
    }
});

/*****************************
 updates a project by ID
 ****************************/
router.put('/:id', async (req, res) => {
    try {
        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            {_id: new ObjectId(req.params.id)},
            {$set: req.body}
        );

        if (result.modifiedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: new ObjectId(req.params.id)});
            res.json(updatedProject);
        } else {
            res.status(404).json({error: 'Project not found or not updated'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to update project'});
    }
});

/*****************************
 delete a project by ID
 ****************************/
router.delete('/:id', async (req, res) => {
    try {
        const result = await req.db.collection(PROJECTS_COLLECTION).deleteOne({_id: new ObjectId(req.params.id)});
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Failed to delete project'});
    }
});

/*************************************
 adds an item to a subcollection
 ************************************/
router.post('/:id/:subcollection', async (req, res) => {
    try {
        const subcollection = req.params.subcollection;
        const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

        if (!validSubcollections.includes(subcollection)) {
            return res.status(400).json({error: 'Invalid subcollection in post!'});
        }

        const newItem = {...req.body, _id: new ObjectId()};

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            {_id: new ObjectId(req.params.id)},
            {$set: {[subcollection]: newItem}}
        );

        if (result.modifiedCount > 0) {
            res.status(200).json(newItem);
        } else {
            res.status(404).json({error: 'Project not found or item not added'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to add item to subcollection'});
    }
});

/****************************************
 updates an item in a subcollection
 **************************************/
router.put('/:id/:subcollection', async (req, res) => {
    try {
        const subcollection = req.params.subcollection;
        const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

        if (!validSubcollections.includes(subcollection)) {
            return res.status(400).json({ error: 'Invalid subcollection' });
        }

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { [subcollection]: req.body } }
        );

        if (result.modifiedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
            return res.json(updatedProject);
        } else {
            const existingProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
            if (existingProject) {
                return res.json(existingProject);
            } else {
                return res.status(404).json({ error: 'Project not found' });
            }
        }
    } catch (error) {
        console.error('Error updating item in subcollection:', error);
        return res.status(500).json({ error: 'Failed to update item in subcollection' });
    }
});



/******************************************
 deletes an item from a subcollection
 ****************************************/
router.delete('/:id/:subcollection', async (req, res) => {
    try {
        const subcollection = req.params.subcollection;
        const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

        if (!validSubcollections.includes(subcollection)) {
            return res.status(400).json({error: 'Invalid subcollection in delete'});
        }

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            {_id: new ObjectId(req.params.id)},
            {$unset: {[subcollection]: ""}}
        );

        if (result.modifiedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: new ObjectId(req.params.id)});
            res.json(updatedProject);
        } else {
            res.status(404).json({error: 'Project not found or item not deleted'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete item from subcollection'});
    }
});

router.get('/:id/:subcollection', async (req, res) => {
    const subcollection = req.params.subcollection;
    const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

    if (!validSubcollections.includes(subcollection)) {
        return res.status(400).json({error: 'Invalid subcollection in get!'});
    }

    try {
        const project = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: new ObjectId(req.params.id)});

        res.json(project[subcollection]);
    } catch (error) {
        res.status(500).json({error: 'Failed to get project'});
    }
})


/****************************************
 updates the name property of a project
 **************************************/
router.put('/:id/name/update', async (req, res) => {
    try {
        const name = req.body.name;
        if (typeof name !== 'string') {
            return res.status(400).json({ error: 'Name must be a string' });
        }

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { name: name } }
        );

        if (result.matchedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
            res.json(updatedProject);
        } else {
            const existingProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
            if (existingProject) {
                res.json(existingProject);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        }
    } catch (error) {
        console.error('Error updating project name:', error);
        res.status(500).json({ error: 'Failed to update project name' });
    }
});

/*******************************
 * Updates the screenshot URL
 ******************************/
router.put('/:id/screenshot/update', async (req, res) => {
    try {
        const screenshotUrl = req.body.screenshotUrl;
        if (typeof screenshotUrl !== 'string') {
            return res.status(400).json({ error: 'screenshotUrl must be a string' });
        }

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { screenshotUrl: screenshotUrl } }
        );

        if (result.matchedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
            res.json(updatedProject);
        } else {
            const existingProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
            if (existingProject) {
                res.json(existingProject);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        }
    } catch (error) {
        console.error('Error updating screenshot URL:', error);
        res.status(500).json({ error: 'Failed to update screenshot URL' });
    }
});


export default router;
