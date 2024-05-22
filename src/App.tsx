import React, { Fragment } from "react";
import "reactflow/dist/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/HomeScreen.tsx";
import "./index.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomeScreen} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
