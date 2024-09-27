import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/users' element={<UsersPage />}/>
        <Route path='/users/:userId' element={<UserProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
