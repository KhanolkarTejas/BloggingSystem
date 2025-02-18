import "./settings.css";
import Sidebar from "../../components/sidebar/SideBar.jsx";
import { useContext, useState } from "react";
import { Context } from "../../context/Context.js";
import axios from "axios";
export default function Settings(props) {

  const [file,setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [desc,setDesc]=useState('');
  
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:8080/images/"
  const [success,setSuccess]=useState(false)

  const handleDelete = async ()=>{
    try{
      console.log(user._id,user.username)
      
      await axios.delete(`/users/${user._id}`,{data:{userId:user._id}})
      props.user=null;
      //dispatch()
      window.location.replace("/register")
    }catch(err){}
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser={
      userId:user._id,
      username,
      email,
      password,
      desc
      
     
     
    }
    
    if(file){
      const data = new FormData();
      const filename=Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      updatedUser.profilePic=filename || '' ;
      try{
        await axios.post("/upload",data);
      }catch(err){}
      
      try{
        const res = await axios.put("/users/"+user._id,updatedUser)
        setSuccess(true)
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})
        console.log(user)
       
      }catch(err){
        console.log(err)
        dispatch({type:"UPDATE_FAILURE"})
      }

       
      }
      
    }
    return (
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file): PF + user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input type="text" placeholder={user.username}  onChange={e=>setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" placeholder={user.email}  onChange={e=>setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password"   onChange={e=>setPassword(e.target.value)}/>
            <label>description</label>
            <input type="desc"  onChange={e=>setDesc(e.target.value)}/>
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
            {success && (<span style={{color:"green",textAlign:"center",marginTop:"20px"}}>profile has been updated...</span>)}
          </form>
        </div>
        <Sidebar />
      </div>
    );
  }
  

