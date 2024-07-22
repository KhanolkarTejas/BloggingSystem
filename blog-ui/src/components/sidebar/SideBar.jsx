import { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";


export default function SideBar() {
 const [cats,setCats]=useState([]);
 const {user} =useContext(Context);

 const PF = "http://localhost:8080/images/"

  

  useEffect(()=>{
    const getCats = async ()=>{
     const res =  await axios.get('/categories')
     console.log(res)
     setCats(res.data)
    };
    getCats();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={!user?"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=is&k=20&c=tw9TuTigzhSlLA_b1Avy0X6GNF9ZFVvgTHIZ9i68Q0I=":PF + user.profilePic}
          alt=""
        />
        {user?(user.desc):(<p>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
tempora neque vitae nihil minus at incidunt impedit, eos laudantium
error!
</p>)}
        
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            
            {cats.map((c)=>( 
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
            )
            )}
           

           
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className=" sidebarIcon fa-brands fa-square-twitter"></i>
            <i className=" sidebarIcon fa-brands fa-square-instagram"></i>
            <i className=" sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className=" sidebarIcon fa-brands fa-square-facebook"></i>
          </div>
        </div>
    </div>
  );
}
