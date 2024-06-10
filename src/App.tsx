import React, {Fragment, useEffect, useState} from "react";
import "reactflow/dist/style.css";
import "./styles/text-updater-node.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen.tsx";
import { ProjectPage } from "./pages/ProjectPage.tsx";
import {SetupPage} from "./pages/SetupPage";
import {createProject, getProjects} from "./services/api";

function App() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };

    fetchProjects();
  }, []);

  const handleCreateProject  = async () => {
    const newProject = {
      name: 'New Project'
    };
    const createdProject = await createProject(newProject);
    setProjects([...projects, createdProject]);
  };

  return (
    <Fragment>
      <div>
        <h1>Mapping Data</h1>
        <ul>
          {projects.map((project) => (
              <b><li key={project._id}>{project.name}</li></b>
          ))}
        </ul>
        <button onClick={handleCreateProject}>Create Project</button>
      </div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={HomeScreen} />
            <Route path="/project" Component={ProjectPage} />
            <Route path="/setup" Component={SetupPage} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
