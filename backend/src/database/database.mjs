import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://tobi:WWkjfLektNUm3QVM@iot-configuration.qoupblv.mongodb.net/?retryWrites=true&w=majority&appName=IoT-Configuration';
const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('test');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};