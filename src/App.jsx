import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokemons from './components/pages/Pokemons/Pokemons';
import Header from './components/organisms/Header/Header';
import Favorites from './components/pages/Favorites/Favorites';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Pokemons />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
