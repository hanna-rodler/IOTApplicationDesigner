import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const USER_COLLECTION = "user";


router.get('/', async (req, res) => {
    try {
        const projects = await req.db.collection(USER_COLLECTION).find().toArray();
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to get projects'});
    }
});

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = req.db;
        const userCollection = db.collection(USER_COLLECTION);

        const existingUser = await userCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        await userCollection.insertOne(newUser);

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = req.db;
        const userCollection = db.collection(USER_COLLECTION);

        const user = await userCollection.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid username or password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
