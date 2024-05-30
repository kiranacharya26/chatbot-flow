// src/App.js
import React from 'react';
import './App.css';
import FlowBuilder from './component/FlowBuilder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <FlowBuilder />
      </DndProvider>
    </div>
  );
}

export default App;
