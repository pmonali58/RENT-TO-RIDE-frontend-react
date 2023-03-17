import { useEffect, useState } from "react";
import { useReducer } from "react"; 
import {Link, useNavigate } from "react-router-dom";

function ViewVehicle()
{

 
    const [vehicles,setVehicles]=useState([]);
    useEffect(()=>{
      
        const ownid=JSON.parse(localStorage.getItem("loggedowner")).own_id
        console.log(ownid);
        fetch("http://localhost:8080/getVehicle?own_id="+ownid)
      .then(resp=>resp.json())
      .then(obj=>{
        setVehicles(obj);
       
      })
    },[])
  
  
    const nav=useNavigate();
    const sendvehicle=(veh_id)=>{
    fetch("http://localhost:8080/removeVehicle?veh_id="+veh_id)
    .then(resp=>resp.json())
     .then(obj=>{console.log(JSON.stringify(obj))
    if(obj)
    {
      console.log(obj);
      alert("Vehicle Removed")
      nav("/ViewVehicle")
			window.location.reload();
      //Window.lacation.reload();
    }
    })
  }
   

    const owner=JSON.parse(localStorage.getItem("loggedowner"))


    return(
      <div>
           <nav className="navbar navbar-expand-sm bg-primary mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/logout" className="nav-link ps-3">Logout</Link>
            </li>
            <li className="nav-item">
              <Link to="/OwnerHome" className="nav-link ps-3">Owner Home</Link>
            </li>
          </ul>
    </div>
      </nav>
   
    <h1>View Your Vehicle</h1>
    <h2>{owner.fname} {owner.lname}</h2>
    <table>
    {vehicles.map(vehicle => (
  
          
        <tr>
        
          <td class="col-7 shadow-lg p-3 mb-5 bg-white rounded" key={vehicle.veh_id}>
            <img src={`data:image/jpeg;base64,${vehicle && vehicle.vehimage}`} width="300" height="300"  class="img-fluid img-thumbnail" /><br/>
            </td> 
            <td class="col-2 shadow-lg p-3 mb-5 bg-white rounded">
            Vehicle Name : {vehicle && vehicle.veh_name}<br/>
            Type : {vehicle && vehicle.type}<br/>
            Plate Number : {vehicle && vehicle.plate_number}<br/>
            Charges per hour: {vehicle && vehicle.charges_per_hour}<br/>
            Charges per day: {vehicle && vehicle.charges_per_day}
            </td>
          
       
        <td>
      <button onClick={()=>{sendvehicle(vehicle.veh_id)}}class="col-3 btn btn-primary mb-4">Remove vehicle</button>
      </td>
      </tr>
      ))}
      
        
        
    </table>
   </div>
    );
};
export default ViewVehicle;