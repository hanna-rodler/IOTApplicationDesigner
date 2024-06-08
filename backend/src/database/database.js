import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://tobi:WWkjfLektNUm3QVM@iot-configuration.qoupblv.mongodb.net/?retryWrites=true&w=majority&appName=IoT-Configuration\n';
const client = new MongoClient(uri);

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export const getDB = () => {
    return client.db();
};