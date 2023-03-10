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
          else if(obj.role_name==="admin"){
            navigate("/AdminHome")
          }
          
        }
      })

      
     }
    return(
      <div>
       <div class="wrapper fadeInDown">
  <div id="formContent">
   

    
  

    
    <form>
      <table>
        <tr>
      <td><label htmlfor="email_id" classname="form-label">Enter EmailID :</label>
        <input type="text" className="fadeIn second" id="emailid" name="emailid" value={info.email_id} 
        onChange={(e)=>{dispatch({type:'update',fld:'email_id',val:e.target.value})}}/><br/>
        <br/></td></tr>
       <tr>
        <td><label htmlfor="password" classname="form-label">Enter password :</label>
        <input type="password" className="fadeIn third" id="password" name="password" value={info.password}
        onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value})}}/>
        </td>
      </tr>
      <br/>
 <button type="submit" class="fadeIn fourth" onClick={(e)=>{sendData(e)}}>Submit</button>
      <button type="reset" class="fadeIn fourth" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>

      </table>
    </form>

  


  </div>
</div>
    <p>{JSON.stringify(info)}</p>
    <p>{msg}</p>
    </div>
    )
}