import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Results from "./pages/Results";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/results" element={<Results />} /> */}
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
