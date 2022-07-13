import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';


import './input.css';
import CreateMangaPage from './pages/CreateMangaPage';
import GenrePage from './pages/GenrePage';
import CreateGenre from './components/CreateGenre/CreateGenre';
import ShowMangaPage from './pages/ShowMangaPage';
import FeedBackPage from './pages/FeedBackPage';
import CreateEpisodePage from './pages/CreateEpisodePage';
import CreateMangaImagesPage from './pages/CreateMangaImagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector } from 'react-redux';
function App() {
  const {value}=useSelector(state=>state.auths);
  const auths=value? value:localStorage.getItem('auths') && JSON.parse(localStorage.getItem('auths'));
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={auths ? <Navigate replace to='/admin/dashboard' /> :<LoginPage/>}
          />
          <Route path='/admin/dashboard/paginate/:page' element={auths ? <Dashboard /> : <LoginPage/>} />
          <Route path='/admin/dashboard' element={auths ? <Dashboard /> : <LoginPage/>} />
          <Route path='/admin/createManga' element={auths ? <CreateMangaPage />: <LoginPage/>} />
          <Route path='/admin/createManga/:id' element={auths ? <CreateMangaPage />:<LoginPage/>} />
          <Route path='/admin/genre' element={auths ? <GenrePage/>:<LoginPage/>} />
          <Route path='/admin/createGenre' element={auths ? <CreateGenre/>:<LoginPage/>} />
          <Route path='/admin/genre/paginate/:page' element={auths ? <GenrePage/>:<LoginPage/>} />
          <Route path='/admin/manga' element={auths ? <ShowMangaPage/>:<LoginPage/>}/>
          <Route path='/admin/manga/paginate/:page' element={auths ? <ShowMangaPage/>:<LoginPage/>}/>
          <Route path='/admin/userfeedback' element={auths?<FeedBackPage/>:<LoginPage/>} />
          <Route path='/admin/manga/detail/:mangaId' element={auths ? <CreateEpisodePage/>:<LoginPage/>}/>
          <Route path='/admin/createMangaImages/:id' element={auths ? <CreateMangaImagesPage/>:<LoginPage/>}  />
          <Route path='/admin/login' element={<LoginPage/>} />
          <Route path='/admin/Register' element={<RegisterPage/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
