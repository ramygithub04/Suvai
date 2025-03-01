import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = (setIsLoggedIn) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
  
    const handleLogin = async ()=>{
      try{
        await axios.post("http://localhost:3000/login",{email,password})
        localStorage.setItem("username",res.data.username)
        setIsLoggedIn(true)
        navigate("/home");
      } catch(error){
        alert("Invalid Credentials");
      }
    };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        navigate("/home");
      }}>
      
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
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

export default Login;