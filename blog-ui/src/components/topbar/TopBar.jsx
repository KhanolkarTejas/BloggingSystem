import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const {user,dispatch} =useContext(Context);
  const PF = "http://localhost:8080/images/"

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem"
          onClick={handleLogout}>
              {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
      
        {
        user?
        (<Link to="/settings">
          {user.profilePic?(<img
          src={PF + user.profilePic}
          alt=""
          className="topImg"
        />):(
          <img
          src="https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=2048x2048&w=is&k=20&c=4kYlrBEQrLWS--wVUBYiNnMCX6psXAFLuTnARiJotiM="
          alt=""
          className="topImg">
          </img>
        )}
        </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
            <Link className="link" to="/login">LOGIN</Link>
            </li>
          <li className="topListItem">
          <Link className="link" to="/register">REGISTER</Link>
          </li>
         
          </ul>
          
        )
        }
        <i className="topSerchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
