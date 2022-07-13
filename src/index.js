import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { genreSlice } from './features/genreSlice';
import { mangaSlice } from './features/mangaSlice';
import authReducer from './features/authSlice';
const store=configureStore({
  reducer:{
    [genreSlice.reducerPath]:genreSlice.reducer,
    [mangaSlice.reducerPath]:mangaSlice.reducer,
    auths:authReducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(genreSlice.middleware).concat(mangaSlice.middleware)
})
// const root = ReactDOM.createRoot(document.getElementById('root'));
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
