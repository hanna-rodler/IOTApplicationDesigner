import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// Create a new project
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(API_URL, projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating new project:', error);
        throw error;
    }
};

// Get all projects
export const getProjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error retrieving projects:', error);
        throw error;
    }
};

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
