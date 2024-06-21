import axios from "axios";

const API_URL = "http://localhost:5000/api/projects/";

/*********************
 creates a new project
 ********************/
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating new project:", error);
    throw error;
  }
};

/*********************
 gets all projects
 ********************/
export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};

/*****************************
 gets a specific project by ID
 ****************************/
export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting project by ID:", error);
    throw error;
  }
};

/*****************************
 updates a project by ID
 ****************************/
export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

/*****************************
 delete a project by ID
 ****************************/
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

/*******************************
 adds an item to a subcollection
 ******************************/
export const addSubcollectionItem = async (
  projectId,
  subcollection,
  itemData
) => {
  try {
    const response = await axios.post(
      `${API_URL}${projectId}/${subcollection}`,
      itemData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding subcollection item:", error);
    throw error;
  }
};

/**********************************
 updates an item in a subcollection
 *********************************/
export const updateSubcollectionItem = async (
  projectId,
  subcollection,
  itemData
) => {
  try {
    const response = await axios.put(
      `${API_URL}${projectId}/${subcollection}`,
      itemData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating subcollection item:", error);
    throw error;
  }
};

/************************************
 deletes an item from a subcollection
 ***********************************/
export const deleteSubcollectionItem = async (projectId, subcollection) => {
  try {
    const response = await axios.delete(
      `${API_URL}${projectId}/${subcollection}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting subcollection item:", error);
    throw error;
  }
};

/************************************
 gets an item from a subcollection
 ***********************************/
export const getSubcollectionItem = async (projectId, subcollection) => {
  try {
    const response = await axios.get(`${API_URL}${projectId}/${subcollection}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subcollection item:", error);
    throw error;
  }
};
