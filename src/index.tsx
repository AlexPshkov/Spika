import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import Main from "./main/Main";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App presentation={{name: "Test", slides: [], currentSlideId: -1}}/>
      {/*<Main/>*/}
  </React.StrictMode>
);

//TODO presentation: создать, сохранить, открыть

//TODO slide: переместить, переместить несколько слайдов

//TODO block: копировать, вставить