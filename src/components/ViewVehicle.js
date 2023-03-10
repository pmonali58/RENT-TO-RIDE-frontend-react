import { useEffect, useState } from "react";
function ViewVehicle()
{
    const [vehicles,setVehicles]=useState([]);
    useEffect(()=>{
      
        const ownid=JSON.parse(localStorage.getItem("loggedowner")).own_id
        console.log(ownid);
        fetch("http://localhost:8080/getVehicle?own_id="+ownid)
      .then(resp=>resp.json())
      .then(obj=>{
        console.log("Hello:")
        console.log(obj)
        localStorage.setItem("loggedvehicle",JSON.stringify(obj))
        setVehicles(obj);
      })
    },{})
  
    const owner=JSON.parse(localStorage.getItem("loggedowner"))

    return(
   <div>
    <h1>View Your Vehicle</h1>
    <h3>{owner.fname}{owner.lname}</h3>
    <table border-collapse:collapse>
    {vehicles.map(vehicle => (
  
          
        <tr>
        
          <td className="list-group-item" key={vehicle.veh_id}>
            <img src={`data:image/jpeg;base64,${vehicle && vehicle.vehimage}`} width="200" height="200"/><br/>
            </td> 
            <td>
            {vehicle && vehicle.veh_name}<br/>
            {vehicle && vehicle.type}<br/>
            {vehicle && vehicle.plate_number}
             </td>
          
       
        <td>
      <button >Remove vehicle</button>
      </td>
      </tr>
      ))}
      
        
        
    </table>
   </div>
    );
};
export default ViewVehicle;