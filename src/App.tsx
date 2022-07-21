import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
