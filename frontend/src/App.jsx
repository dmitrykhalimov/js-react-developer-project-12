import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login.jsx';
import Main from './views/Main.jsx';
import NotFound from './views/NotFound.jsx';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
