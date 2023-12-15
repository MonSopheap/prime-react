import './App.css';
import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import './styles/PublicCss.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageNotFound from './components/PageNotFound';
import Settings from './pages/settings/Settings';
import HomePage from './pages/home/HomePage';
import ItemCenter from './pages/items/ItemCenter';
import Profile from './pages/profile/Profile';
import ActivityLogs from './pages/activities-log/ActivityLogs';
import LoginPage from './pages/auth/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import DeveloperPage from './pages/developer/DeveloperPage';
import ProtectedRoute from './commom/protected-route';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<PageNotFound />}></Route>

          <Route path="home" element={<HomePage />}>
            <Route path='developer' element={<DeveloperPage />}></Route>
            <Route path='dashboard' element={<span>Dashboard</span>}></Route>
            <Route path='submenu1' element={<span>Submenu 1</span>}></Route>
            <Route path='submenu2' element={<span>Submenu 2</span>}></Route>
            <Route path='submenu3' element={<span>Submenu 3</span>}></Route>
            <Route path='submenu4' element={<span>Submenu 4</span>}></Route>
            {/* 👇️ only match this when no other routes match */}
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path='item-center' element={<ItemCenter />}></Route>
          <Route path='setting' element={<Settings />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='report/activity-log' element={<ActivityLogs />}></Route>
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />}></Route>
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<null />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
