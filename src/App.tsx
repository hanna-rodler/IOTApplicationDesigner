import {Fragment} from "react";
import "reactflow/dist/style.css";
import "./styles/text-updater-node.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeScreen} from "./pages/HomeScreen";
import ProjectPage from "./pages/ProjectPage";
import {ProjectListPage} from "./pages/ProjectListPage";
import {SetupPage} from "./pages/SetupPage";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={HomeScreen}/>
                    <Route path="/project/:projectId" Component={ProjectPage}/>
                    <Route path="/setup" Component={SetupPage}/>
                    <Route path="/setup/:projectId" Component={SetupPage}/>
                    <Route path="/projects" Component={ProjectListPage}/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
