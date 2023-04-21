import './styles/App.css';
import { BrowserRouter, Routes, Route, Link, redirect } from "react-router-dom";
import Nava from './components/Nav';
import Learn from './components/Learn'
import Skill from './components/Skill'
import Lesson from './components/Lesson'
import Welcome from './components/Welcome'
import Post from './components/Post'
import Resources from './components/Resources'
import Portfolio from './components/Portfolio';
import ReadPost from './components/ReadPost';
import Footer from './components/Footer';
import Biblioteca from './components/Biblioteca';
import Categoria from './components/Categoria'
import JoinForm from './components/JoinForm';
import KnowAboutHive from './components/KnowAboutHive';

import {useLocation} from 'react-router-dom'


function RouterSwitch() {
  const currentPath = window.location.pathname;

  
  console.log(currentPath)
  return (
 <BrowserRouter>
     
    {/* {  currentPath!=="/join"  && currentPath!=="/Join" && <Nava/> }  */}
    <Nava/>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/learn" element={<Learn />} />
      <Route path= "/learn/:name" element={<Skill/>} />
      <Route path= "/learn/:name/:lesson" element={<Lesson/>} />
      <Route path= "/learn/:name/:lesson/post/:tag" element={<Post/>} />
      <Route path="/resources" element={<Resources />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/portfolio/:name" element={<Portfolio/>} />
      <Route path="/biblioteca" element={<Biblioteca/>} />
      <Route path="/biblioteca/:categoria" element={<Categoria/>} />
      <Route path="/biblioteca/@:author/:permlink" element={<ReadPost/>} />
      <Route path="/know" element={<KnowAboutHive/>} />
      <Route path="/join" element={<JoinForm/>} />
    </Routes>
    <Footer/>
    {/* {currentPath!=="/" && currentPath!=="/join" && currentPath!=="/Join" && <Footer /> } */}
 </BrowserRouter>
  );
}

export default RouterSwitch;
