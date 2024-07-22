import Home from "./pages/homepage/HomePage.jsx";
import TopBar from "./components/topbar/TopBar.jsx"
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Settings from "./pages/setting/Settings.jsx";
import Write from "./pages/write/Write.jsx";
import Single from "./pages/single/Single.jsx";

import {
  Routes,
  Route,
  BrowserRouter,
  
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context.js";


function App() {
  const {user}=useContext(Context);
  return (
    <>
    
    <BrowserRouter>
    <TopBar/>
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path ="/register" element={user ?<Home/>:<Register/>}/>
        <Route path ="/login" element={user ?<Home/> :<Login/>}/>
        <Route path ="/settings" element={user?<Settings user={user} />:<Register/>}/>
        <Route path ="/write" element={user?<Write/>:<Register/>}/>
        <Route path ="/post/:postId" element={user?<Single/>:<Register/>}/>
      
    </Routes>
    </BrowserRouter>
    
    </>
    
  );
}

export default App;
