import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from "axios";

const Register = ({setIsLoggedIn}) => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const handleRegister = async ()=>{
    await axios.post("http://localhost:3000/register",{username,email,password})
    localStorage.setItem("username",username)
    setIsLoggedIn(true)
    navigate("/home");
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        navigate("/home");
      }}>
      
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input type="String" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Email</label>
          <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">I'm not a robot</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default Register;