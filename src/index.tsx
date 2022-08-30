import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import {AlertProvider} from "./Alert/AlertStore";
import {Provider} from "react-redux";
import {store} from "./Store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      {/*<AlertProvider>*/}
      <Provider store={store}>
          <App />
      </Provider>
      {/*</AlertProvider>*/}
  </React.StrictMode>
);
