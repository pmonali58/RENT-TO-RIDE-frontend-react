import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './login.css';

import OwnerHome from "./OwnerHome";
import { login } from "./slice";
export default function LoginComp()
{
  const init={
   email_id:"",
   password:""
   

     }
     const reducer=(state,action)=>{
      switch(action.type){
        case 'update':
          return {...state, [action.fld]:action.val}
        
        case 'reset':
          return init; 
      
      }
     }

     const[info,dispatch]=useReducer(reducer,init);
     const[msg,setMsg]=useState("");
     const navigate=useNavigate();
     const reduxAction=useDispatch();
     const sendData=(e)=>{
      e.preventDefault();
      const reqOptions={
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(info)
      }
      fetch("http://localhost:8080/chkLogin",reqOptions)
      .then(resp=>{
        if(resp.ok)
        {
          return resp.text();
        }
        else{
          throw new Error("server error");
        }
      })
      .then(text=>text.length ?JSON.parse(text):{})
      .then(obj=>{
        if(Object.keys(obj).length===0)
        {
          setMsg("Invalid emailid and password");
        }
        else{
          console.log("Hello");
          console.log(obj);
          var own_id=obj.login_id

         //var own_id=obj.own_id

         // console.log(own_id);
          //console.log(info);
          reduxAction(login({own_id}))
          localStorage.setItem("loggeduser",JSON.stringify(obj));
          
          if(obj.role_name==="owner")
          {
            localStorage.setItem("loggedowner",JSON.stringify(obj));

            navigate("/OwnerHome");
          }
          else if(obj.role_name==="customer")
          {
            navigate("/CustomerHome");
          }
          else if(obj.role_name==="admin")
          {
            navigate("/AdminHome");
          }
          
        }
      })

      
     }
    return(
      
          <div class="bg-img-login">
          <div className="Auth-form-container">
      
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label class="text-white">Email address</label>
            <input
              type="email"
              id="emailid"
              name="emailid"
              className="form-control mt-1"
              placeholder="Enter email"
              value={info.email_id}
              onChange={(e) => { dispatch({ type: 'update', fld: 'email_id', val: e.target.value }) }}
            />
          </div>
          <div className="form-group mt-3">
            <label class="text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={info.password}
              onChange={(e) => { dispatch({ type: 'update', fld: 'password', val: e.target.value }) }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={(e) => { sendData(e) }}>
              Submit
            </button>
            <button type="reset" className="btn btn-primary" onClick={() => { dispatch({ type: 'reset' }) }}>
              Clear
            </button>
          </div>
          
          <p>{JSON.stringify(info)}</p>
          <p>{msg}</p>
        </div>
      </form>
      
</div>
    </div>
    )
}