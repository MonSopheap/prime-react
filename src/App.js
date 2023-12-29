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
import ProtectedRoute from './commom/ProtectedRoute';
import BackupDatabase from './pages/tools/BackupDatabase';
import RolePage from './pages/roles/RolePage';
import { UserContextProvider } from './contexts/UserContext';
import UserCenter from './pages/users/UserCenter';
import TelegramGroup from './pages/tools/TelegramGroup';


function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="home" element={<HomePage />}>
              <Route path='stock/item' element={<ItemCenter />}></Route>
              <Route path='developer' element={<DeveloperPage />}></Route>
              <Route path='dashboard' element={<span>Dashboard</span>}></Route>
              <Route path='submenu1' element={<span>Submenu 1</span>}></Route>
              <Route path='submenu2' element={<span>Submenu 2</span>}></Route>
              <Route path='submenu3' element={<span>Submenu 3</span>}></Route>
              <Route path='submenu4' element={<span>Submenu 3</span>}></Route>
              <Route path='user' element={<UserCenter />}></Route>
              <Route path='role' element={<RolePage />}></Route>
              <Route path='database' element={<BackupDatabase />}></Route>
              <Route path='telegram-group' element={<TelegramGroup />}></Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path='setting' element={<Settings />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='report/activity-log' element={<ActivityLogs />}></Route>
            {/* 👇️ only match this when no other routes match */}
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path='login' element={<LoginPage />}></Route>
            <Route path="*" element={<null />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
