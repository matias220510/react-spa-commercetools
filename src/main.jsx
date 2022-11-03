import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Layout from "./components/Layout/Layout";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Layout>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
