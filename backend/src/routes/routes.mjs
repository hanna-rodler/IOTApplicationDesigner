import {Router} from 'express';
import {ObjectId} from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = "projects";

/*****************************
 sets all projects to inactive
 ****************************/
router.put('/set-all-inactive', async (req, res) => {
    try {
        await req.db.collection(PROJECTS_COLLECTION).updateMany({}, { $set: { active: false } });
        res.json({ message: 'All projects set to inactive' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to set all projects to inactive' });
    }
});

/*********************************
 sets a specific project to active
 ********************************/
router.put('/:id/set-active', async (req, res) => {
    try {
        const projectId = new ObjectId(req.params.id);

        // Set all projects to inactive first
        await req.db.collection(PROJECTS_COLLECTION).updateMany({}, { $set: { active: false } });

        // Set the selected project to active
        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            { _id: projectId },
            { $set: { active: true } }
        );

        if (result.modifiedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ _id: projectId });
            res.json(updatedProject);
        } else {
            res.status(404).json({ error: 'Project not found or not updated' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to set project to active' });
    }
});

/*********************************
 gets the currently active project
 ********************************/
router.get('/active', async (req, res) => {
    try {
        const activeProject = await req.db.collection(PROJECTS_COLLECTION).findOne({ active: true });
        res.json(activeProject);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get active project' });
    }
});


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
            active: req.body.active
        };
        const result = await req.db.collection(PROJECTS_COLLECTION).insertOne(project);
        const insertedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: result.insertedId});
        res.json(insertedProject);
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
            return res.status(400).json({error: 'Invalid subcollection!'});
        }

        const newItem = {...req.body, _id: new ObjectId()};

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            {_id: new ObjectId(req.params.id)},
            {$set: {[subcollection]: newItem}}
        );

        if (result.modifiedCount > 0) {
            res.json(newItem);
        } else {
            res.status(404).json({error: 'Project not found or item not added'});
        }
    } catch (error) {
        console.log(error);
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
            return res.status(400).json({error: 'Invalid subcollection'});
        }

        const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
            {_id: new ObjectId(req.params.id)},
            {$set: {[subcollection]: req.body}}
        );

        if (result.modifiedCount > 0) {
            const updatedProject = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: new ObjectId(req.params.id)});
            res.json(updatedProject);
        } else {
            res.status(404).json({error: 'Project not found or item not updated'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to update item in subcollection'});
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
            return res.status(400).json({error: 'Invalid subcollection'});
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
        console.log(error);
        res.status(500).json({error: 'Failed to delete item from subcollection'});
    }
});

router.get('/:id/:subcollection', async (req, res) => {
    const subcollection = req.params.subcollection;
    const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

    if (!validSubcollections.includes(subcollection)) {
        return res.status(400).json({error: 'Invalid subcollection!'});
    }

    try {
        const project = await req.db.collection(PROJECTS_COLLECTION).findOne({_id: new ObjectId(req.params.id)});

        res.json(project[subcollection]);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to get project'});
    }

})


/****************************************
 updates an item in a subcollection
 **************************************
 router.put('/:id/:subcollection/:subId', async (req, res) => {
 try {
 const subcollection = req.params.subcollection;
 const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

 if (!validSubcollections.includes(subcollection)) {
 return res.status(400).json({ error: 'Invalid subcollection' });
 }

 const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
 { _id: new ObjectId(req.params.id), [`${subcollection}._id`]: new ObjectId(req.params.subId) },
 { $set: { [`${subcollection}.$`]: req.body } }
 );
 res.json(result);
 } catch (error) {
 console.log(error);
 res.status(500).json({ error: 'Failed to update item in subcollection' });
 }
 });

 /******************************************
 deletes an item from a subcollection
 ****************************************
 router.delete('/:id/:subcollection/:subId', async (req, res) => {
 try {
 const subcollection = req.params.subcollection;
 const validSubcollections = ['topics', 'dialog', 'edges', 'mappings'];

 if (!validSubcollections.includes(subcollection)) {
 return res.status(400).json({ error: 'Invalid subcollection' });
 }

 const result = await req.db.collection(PROJECTS_COLLECTION).updateOne(
 { _id: new ObjectId(req.params.id) },
 { $pull: { [subcollection]: { _id: new ObjectId(req.params.subId) } } }
 );
 res.json(result);
 } catch (error) {
 console.log(error);
 res.status(500).json({ error: 'Failed to delete item from subcollection' });
 }
 });
 */

export default router;
