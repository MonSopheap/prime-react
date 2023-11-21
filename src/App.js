import './App.css';
// import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import './styles/PublicCss.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageNotFound from './components/PageNotFound';
import Settings from './pages/settings/Settings';
import HomePage from './pages/home/HomePage';
import ItemCenter from './pages/stock/ItemCenter';

function App() {
  return (
    <BrowserRouter basename='/web'>
      <MainLayout>
        <Routes>
          <Route path='home' element={<HomePage />}></Route>
          <Route path='item-center' element={<ItemCenter />}></Route>
          <Route path='setting' element={<Settings />}></Route>
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
