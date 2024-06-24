import React, { Fragment, useEffect, useState } from "react";
import "reactflow/dist/style.css";
import "./styles/text-updater-node.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen";
import ProjectPage from "./pages/ProjectPage";
import { SetupPage } from "./pages/SetupPage";
import {
  addSubcollectionItem,
  createProject,
  deleteProject,
  deleteSubcollectionItem,
  getProjectById,
  getProjects,
  updateProject,
  updateSubcollectionItem
} from "./services/api";

function App() {
  /*
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [subcollectionItems, setSubcollectionItems] = useState<any | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };
    console.log('subcollectionItems:', subcollectionItems);

    fetchProjects();
  }, [subcollectionItems]);

  const handleCreateProject = async () => {
    const newProject = {
      name: 'New Project2'
    };
    const createdProject = await createProject(newProject);
    setProjects([...projects, createdProject]);
    console.log(projects);
  };

  const handleSelectProject = async (id: string) => {
    const project = await getProjectById(id);
    console.log('Selected project:', project);

    setSelectedProject(project);
    setSubcollectionItems(project.dialog || {});
  };

  const handleUpdateProject = async (id: string) => {
    const updatedProjectData = { name: 'Updated Project Name' };
    const updatedProject = await updateProject(id, updatedProjectData);
    setProjects(projects.map(p => (p._id === id ? updatedProject : p)));
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    setProjects(projects.filter(p => p._id !== id));
  };

  const handleAddSubcollectionItem = async (projectId, subcollection) => {
    const newItem = {
      discover_prefix: '',
      connection: {
        keep_alive: 60,
        client_id: '',
        clean_session: true,
        will_topic: '',
        will_message: '',
        will_qos: 0,
        will_retain: false,
        username: 'asdf',
        password: '',
      }
    };
    try {
      const addedItem = await addSubcollectionItem(projectId, subcollection, newItem);
      const updatedProjects = projects.map(p => {
        if (p._id === projectId) {
          return {
            ...p,
            [subcollection]: addedItem
          };
        }
        return p;
      });
      setProjects(updatedProjects);
      setSelectedProject(updatedProjects.find(p => p._id === projectId));
      setSubcollectionItems(addedItem);
    } catch (error) {
      console.error('Error adding subcollection item:', error);
    }
  };

  const handleUpdateSubcollectionItem = async (projectId: string, subcollection: string) => {
    const updatedItem = {
      discover_prefix: '',
      connection: {
        keep_alive: 60,
        client_id: '',
        clean_session: true,
        will_topic: '',
        will_message: '',
        will_qos: 0,
        will_retain: false,
        username: 'updated',
        password: '',
      }
      // ID gets lost. is it important?? because we only have one.
    };
    const updatedProject = await updateSubcollectionItem(projectId, subcollection, updatedItem);
    setProjects(projects.map(p => (p._id === projectId ? updatedProject : p)));
    setSelectedProject(updatedProject);
    setSubcollectionItems(updatedProject[subcollection]);
  };

  const handleDeleteSubcollectionItem = async (projectId: string, subcollection: string) => {
    const updatedProject = await deleteSubcollectionItem(projectId, subcollection);
    setProjects(projects.map(p => (p._id === projectId ? updatedProject : p)));
    setSelectedProject(updatedProject);
    setSubcollectionItems(null);
  };
*/
  return (
      <Fragment>
        {/*
        <div>
          <h1>Mapping Data</h1>
          <button className="mr-2 ml-2" onClick={handleCreateProject}>Create Project</button>
          <ul>
            {projects.map((project) => (
                <li key={project._id}>
                  {project.name}
                  <button className="mr-2 ml-10" onClick={() => handleSelectProject(project._id)}>View</button>
                  <button className="mr-2 ml-2" onClick={() => handleUpdateProject(project._id)}>Update</button>
                  <button className="mr-2 ml-2" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                  <button className="mr-2 ml-2" onClick={() => handleAddSubcollectionItem(project._id, 'dialog')}>Add Subcollection Item</button>
                </li>
            ))}
          </ul>
          {selectedProject && (
              <div>
                <h2>Selected Project</h2>
                <pre>{JSON.stringify(selectedProject, null, 2)}</pre>
                <h3>Subcollection Item</h3>
                {subcollectionItems && (
                    <div>
                      <pre>{JSON.stringify(subcollectionItems, null, 2)}</pre>
                      <button className="mr-2 ml-2" onClick={() => handleUpdateSubcollectionItem(selectedProject._id, 'dialog')}>Update</button>
                      <button className="mr-2 ml-2" onClick={() => handleDeleteSubcollectionItem(selectedProject._id, 'dialog')}>Delete</button>
                    </div>
                )}
              </div>
          )}
        </div>*/}
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={HomeScreen} />
              <Route path="/project/:projectId" Component={ProjectPage} />
              <Route path="/setup" Component={SetupPage} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </Fragment>
  );
}

export default App;
