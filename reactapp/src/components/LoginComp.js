import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
          reduxAction(login())
          if(obj.role_name==="owner")
          {
            navigate("/OwnerHome");
          }
          
        }
      })

      
     }
    return(
      <div>
        <h1>Login page</h1>
        <form>
      <div className="mb-3">
        <label htmlfor="email_id" classname="form-label">Enter EmailID :</label>
        <input type="text" className="form-control" id="emailid" name="emailid" value={info.email_id} 
        onChange={(e)=>{dispatch({type:'update',fld:'email_id',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="password" classname="form-label">Enter password :</label>
        <input type="password" className="form-control" id="password" name="password" value={info.password}
        onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value})}}/>
      </div>
      <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
      <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
    </form>
    <p>{JSON.stringify(info)}</p>
    <p>{msg}</p>
    </div>
    )
}