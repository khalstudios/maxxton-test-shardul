import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainComp from './components/MainComp';

function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="App">
      <MainComp />
    </div>
  );
}

export default App;
