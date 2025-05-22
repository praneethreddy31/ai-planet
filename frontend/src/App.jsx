import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage';
import Header from './components/Header';
import { DocumentProvider } from './context/DocumentContext';
import './styles.css';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/document/:id" element={<DocumentPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DocumentProvider>
  );
}

export default App;
