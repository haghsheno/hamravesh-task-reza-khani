import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./state";
import { Spin } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import Board from "./components/board";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <Board />
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
