import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bookcomponent from './BookComponent';
import { Link } from "react-router-dom";




function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
fetch("http://localhost:8080/showVehicle")
.then(response=>response.json())
.then(obj=>{
  console.log(obj);
 
   setVehicles(obj);
  
   
  })
 
},{})
  const [selectedVehicleId,setSelectedVehicleId]=useState(null);
 
  const handleVehicleSelection = (vehicle)=>
  {
   navigate('/BookComponent',
   {
    state:
    {vehicle}
  
   });
    
  }

  const navigate=useNavigate();

  return (
    <div>
     
    <nav className="navbar navbar-expand-sm bg-info mb-3">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/logout" className="nav-link ps-3">LogOut</Link>
          </li>
          <li className="nav-item">
            <Link to="/CustomerHome" className="nav-link ps-3">Customer Home</Link>
          </li>
        </ul>
        
  </div>
    </nav>
     <table>
    {vehicles.map(vehicle => (
  
          
        <tr>
        
          <td  class="col-7 shadow-lg p-3 mb-5 bg-white rounded" key={vehicle.veh_id}>
            <img src={`data:image/jpeg;base64,${vehicle && vehicle.vehimage}`} width="300" height="300"  class=" img-fluid img-thumbnail" /><br/>
            </td> 

            <td  class="col-2 shadow-lg p-3 mb-5 bg-white rounded">
            
            Vehicle Name : {vehicle && vehicle.veh_name}<br/>
            Vehicle Type : {vehicle && vehicle.type}<br/>
            Plate Number : {vehicle && vehicle.plate_number}<br/>
            Charges Per Hour : {vehicle && vehicle.charges_per_hour}<br/>
            Charges Per Day : {vehicle && vehicle.charges_per_day}<br/>
             </td>
          <td >
            <button onClick={()=>handleVehicleSelection(vehicle)} class="col-3 btn btn-primary mb-4">Book</button>
          
          </td>
         
       
        </tr>
        ))}
        </table>
    </div>
   
  );

}

export default VehicleList;
