import React, { useReducer, useState,useEffect } from 'react';
import { useSelector } from 'react-redux';


import { json, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OwnerHome from "./OwnerHome";
function VehicleReg()
{
  
//const mystate=useSelector((state)=> state.logged);
//console.log(mystate);
    const init={
       veh_name:"",
       type:"",
       plate_number:"",
        own_id:0
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
          const [file,setfile]=useState();
          const navigate=useNavigate();
          
          const sendData=(e)=>{
            e.preventDefault();
           // console.log(mystate.own_id);
            // info.own_id=mystate.own_id;
            //info.login_id=mystate.own_id;
              info.own_id=JSON.parse(localStorage.getItem("loggedowner")).own_id
            console.log(info);
            console.log(JSON.stringify(info))
      const reqOptions={
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(info)
      }
      
      fetch("http://localhost:8080/regVehicle",reqOptions)
      .then(resp=>{
        if(resp.ok)
        return resp.json();
        else
        throw new Error("server error");
      }).then(obj=>{
        console.log(obj);
    //  })
      //.catch(error=>{console.log(error)})
         const fd =new FormData();
         fd.append("file",file);
         const reqOptions1={
           method:'POST',
            body:fd
         }
         fetch("http://localhost:8080/uploadvehicle/"+obj.veh_id,reqOptions1)
         .then(resp=>resp.json())
         .then(obj=>{
           if(obj.status===false)
         {
             alert("Request has not been approved");
             //navigate("/viewvehicle");
            
         }
         else{
           
            alert("Vehicle Registration successful");
             //navigate("/viewvehicle");
         }
       
         })
      
    
       })
     
     .catch((error)=>alert("server error.Try later"))
  }
    return(
        <div>
            <h1>vehicle Registration</h1>
            <form>
      <div className="mb-3">
        <label htmlfor="veh_name" classname="form-label">Enter vehicle name :</label>
        <input type="text" className="form-control" id="veh_name" name="veh_name" value={info.veh_name} 
        onChange={(e)=>{dispatch({type:'update',fld:'veh_name',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="type" classname="form-label">Enter Type :</label>
        <input type="text" className="form-control" id="type" name="password" value={info.type}
        onChange={(e)=>{dispatch({type:'update',fld:'type',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="plate_number" classname="form-label">Enter vehicle Plate number:</label>
        <input type="text" className="form-control" id="plate_number" name="plate_number" value={info.plate_number} 
        onChange={(e)=>{dispatch({type:'update',fld:'plate_number',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="condition" classname="form-label">upload vehicle photo :</label>
        <input type="file" className="form-control" id="condition" name="condition" 
        onChange={(e)=> setfile(e.target.files[0])}/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
      <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
    </form>
    <p>{JSON.stringify(info)}</p>
        </div>
    )

}
export default VehicleReg;