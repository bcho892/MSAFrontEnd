import './App.css';
import '@fontsource/nunito-sans'
import theme from './theme';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Main from './pages/Main/Main';
import Movie from './pages/Movie/Movie';
import Search from './pages/Search/Search'
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/search/:keyword/:limit/" element={<Search />} />
          <Route path="/search/:keyword/:limit/:year" element={<Search />} />
          <Route path="/search/:keyword/:limit/:genre/:year/" element={<Search />} />

        </Routes>
      </ChakraProvider>
    </div>
  );
}
//react router has no optional params
export default App;
