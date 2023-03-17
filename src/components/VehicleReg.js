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
        own_id:0,
        charges_per_hour:"",
        charges_per_day:""

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
           if(obj.istatus===0)
         {
             alert("Request has not been approved");
             //navigate("/viewvehicle");  
         }
         else{
           
            alert("Registration Not yet Approved !! Try login");
             navigate("/OwnerHome");
         }
       
         })
      
    
       })
     
     .catch((error)=>alert("server error.Try later"))
  }
    return(
      <div class="bg-img-vehreg">
      <div className="Auth-form-container">
     
      <form className="Auth-form">
    <div className="Auth-form-content">
    <h3 className="Auth-form-title">Vehicle Registration</h3> 
    <div className="form-group mt-3"> 
       <input type="text" className="form-control mt-1" placeholder="Vehicle name" id="veh_name" name="veh_name" value={info.veh_name} 
        onChange={(e)=>{dispatch({type:'update',fld:'veh_name',val:e.target.value})}}/>
      </div>
    </div>
    <div className="form-group mt-3">
      <input type="text" className="form-control mt-1" placeholder="Type of vehicle" id="type" name="password" value={info.type}
        onChange={(e)=>{dispatch({type:'update',fld:'type',val:e.target.value})}}/>
    </div>
    <div className="form-group mt-3">
     <input type="text" className="form-control mt-1" placeholder="plate number" id="plate_number" name="plate_number" value={info.plate_number} 
        onChange={(e)=>{dispatch({type:'update',fld:'plate_number',val:e.target.value})}}/>
    </div>
    <div className="form-group mt-3">
        <input type="file" className="form-control mt-1" placeholder="vehicle image" id="veh_image" name="veh_image" 
        onChange={(e)=> setfile(e.target.files[0])}/>
    </div>
  <div className="form-group mt-3">
        <input type="number" className="form-control mt-1" placeholder="Charges per hour" id="charges_per_hour" name="charges_per_hour" 
        onChange={(e)=>{dispatch({type:'update',fld:'charges_per_hour',val:e.target.value})}}/>
   </div>
    <div className="form-group mt-3">
       <input type="number" className="form-control mt-1" placeholder="charges per day" id="charges_per_day" name="charges_per_day" 
         onChange={(e)=>{dispatch({type:'update',fld:'charges_per_day',val:e.target.value})}}/>
   </div>

    <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
    <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
  </form>
      </div>
</div>
    )

}
export default VehicleReg;