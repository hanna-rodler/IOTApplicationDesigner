import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects/';

/*********************
 creates a new project
 ********************/
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(API_URL, projectData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating new project:', error);
        throw error;
    }
};

/*********************
 gets all projects
 ********************/
export const getProjects = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

/*****************************
 gets a specific project by ID
 ****************************/
export const getProjectById = async (id) => {
    const response = await axios.get(API_URL + `${id}`);
    return response.data;
};

/*****************************
 updates a project by ID
 ****************************/
export const updateProject = async (id, projectData) => {
    const response = await axios.put(API_URL + `${id}`, projectData);
    return response.data;
};

/*****************************
 delete a project by ID
 ****************************/
export const deleteProject = async (id) => {
    const response = await axios.delete(API_URL + `${id}`);
    return response.data;
};

/*******************************
 adds an item to a subcollection
 ******************************/
export const addSubcollectionItem = async (projectId, subcollection, itemData) => {
    const response = await axios.post(API_URL + `${projectId}/${subcollection}`, itemData);
    console.log(response.data);
    return response.data;
};

/**********************************
 updates an item in a subcollection
 *********************************/
export const updateSubcollectionItem = async (projectId, subcollection, subId, itemData) => {
    const response = await axios.put(API_URL + `${projectId}/${subcollection}/${subId}`, itemData);
    return response.data;
};

/************************************
 deletes an item from a subcollection
 ***********************************/
export const deleteSubcollectionItem = async (projectId, subcollection, subId) => {
    const response = await axios.delete(API_URL + `${projectId}/${subcollection}/${subId}`);
    return response.data;
};


