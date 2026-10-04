import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<FormPage />} />
        <Route path="/edit/:id" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;