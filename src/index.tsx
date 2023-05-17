import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { Store, applyMiddleware, createStore } from "redux";
import reducer from "./store/reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store: Store<PersonState, PersonAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
