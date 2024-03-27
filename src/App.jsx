import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokemons from './components/pages/Pokemons/Pokemons';
import Header from './components/organisms/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Pokemons />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
