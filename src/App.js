import './App.css';
// import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import './styles/PublicCss.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/home';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter basename='/web'>
      <MainLayout>
        <Routes>
          <Route path='/home' element={<HomePage />}></Route>
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
