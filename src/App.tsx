import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import './App.css';
import Main from './pages/Main/Main';
import Movie from './pages/Movie/Movie';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
