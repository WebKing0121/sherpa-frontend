import React from 'react';
import './App.css';
import SG from './components/StyleGuide.jsx';

function App() {
  return (
    <div className="App">
      <header style={{marginBottom: "3rem"}} className="App-header">
        <h1>Style Guide</h1>
      </header>
      <section className="styleGuide">
        <SG name="Aaron"/>
      </section>
    </div>
  );
}

export default App;
