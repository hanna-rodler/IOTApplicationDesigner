import React, {Fragment, useEffect, useState} from "react";
import "reactflow/dist/style.css";
import "./styles/text-updater-node.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen.tsx";
import { ProjectPage } from "./pages/ProjectPage.tsx";
import {SetupPage} from "./pages/SetupPage";
import {getMappings, saveMapping} from "./services/api";

function App() {
  const [mappings, setMappings] = useState<any[]>([]);

  useEffect(() => {
    const fetchMappings = async () => {
      const data = await getMappings();
      setMappings(data);
    };

    fetchMappings();
  }, []);

  const handleSaveMapping = async () => {
    const mappingData = {
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
      },
      mapping: {},
    };
    console.log(mappingData);
    await saveMapping(mappingData);
  };

  return (
    <Fragment>
      <div>
        <h1>Mapping Data</h1>
        <pre>{JSON.stringify(mappings, null, 2)}</pre>
        <button onClick={handleSaveMapping}>Save Mapping</button>
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
