import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mappings';

export const saveMapping = async (mappingData: any) => {
    try {
        const response = await axios.post(API_URL, mappingData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error saving mapping:', error);
        throw error;
    }
};

export const getMappings = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {

        throw error;
    }
};
