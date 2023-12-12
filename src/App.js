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


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<null />}></Route>
          <Route path="home" element={<HomePage />}></Route>
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
