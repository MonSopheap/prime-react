import './App.css';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter basename='/prime'>
      <MainLayout>
        <Routes>
          {/* <Route path='/' element={<HomePage />}></Route> */}
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<null />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
