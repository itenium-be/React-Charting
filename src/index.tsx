import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Store, applyMiddleware, legacy_createStore as createStore } from "redux";
import reducer from "./store/reducer";
import { thunk } from "redux-thunk";
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
