import React from 'react';
import '../../App.css';
import SG from '../../components/StyleGuide.jsx';

function StylesPage() {
  return (
    <div className="StylesPage">
      <header style={{ marginBottom: "3rem" }} className="App-header">
        <h1>Style Guide</h1>
      </header>
      <section className="styleGuide">
        <SG name="Aaron" />
      </section>
    </div>
  );
}

export default StylesPage;
