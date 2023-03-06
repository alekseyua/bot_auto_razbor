import React from "react";

import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routers/routers';
import { StoreContext } from 'storeon/react';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store} > 
        <RouterProvider router={router} /> 
    </StoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
