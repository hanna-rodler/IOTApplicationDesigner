import React, {Fragment} from 'react';
import 'reactflow/dist/style.css';
import './styles/text-updater-node.css'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProjectPage} from "./pages/ProjectPage.tsx";


function App() {

    return (
        <Fragment>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={ProjectPage}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </Fragment>


    );
}

export default App;
