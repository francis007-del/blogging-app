import './App.css'
import React from 'react'
import Post from './components/post'
import Header from './components/header';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import { UserContext, UserContextProvider } from './UserContext';
import CreatePost from './pages/createpost';
import HomePage from './pages/homepage';
import FullDetails from './pages/fulldetails';
import EditPage from './pages/editpage';
import Cateogory from './pages/cateogory';
import BookMarks from './pages/bookmarks';
import UserPosts from './pages/userposts';
function App() {
  return (
    <>
   <UserContextProvider>
    <Header/>
    <Routes>
     <Route index element={
     <HomePage/>
     }/>
     <Route path={'/login'} element={<LoginPage/>}/>
     <Route path={'/register'} element={<RegisterPage/>}/>
     <Route path={'/create'} element={<CreatePost/>}/>
     <Route path={'/post/:id'} element={<FullDetails/>}/>
     <Route path={'/edit/:id'} element={<EditPage/>}/>
     <Route path={'/type/:id'} element={<Cateogory/>}/>
     <Route path={'/bookmarks'} element={<BookMarks/>}/>
     <Route path={'/:id'} element={<UserPosts/>}/>
    </Routes>
    <div className="footer">© Naveed</div>
    </UserContextProvider>
    </>
  );
}

export default App;
