import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Импорт Redux Provider
import store from "./store"; // Импорт хранилища Redux
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}> {/* Оборачиваем приложение в Redux Provider */}
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
