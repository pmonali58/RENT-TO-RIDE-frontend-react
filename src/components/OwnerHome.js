import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function OwnerHome(){

  const [owner,setOwner]=useState(null);
  useEffect(()=>{
    
    const loginid=JSON.parse(localStorage.getItem("loggeduser")).login_id;
    fetch("http://localhost:8080/getOwner?login_id="+loginid)
    .then(resp=>resp.json())
    .then(obj=>{
      console.log("Hello:")
      console.log(obj)
      localStorage.setItem("loggedowner",JSON.stringify(obj))
      setOwner(obj);
    })
  },{})
  // Set the owner ID in local storage


  const mystate=useSelector((state)=> state.logged);
console.log(mystate);
const navigate=useNavigate();
var senddata=(e)=>
{
  e.preventDefault();
  navigate("/VehicleReg");
}
    return(
        <div>
           <nav className="navbar navbar-expand-sm bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/logout" className="nav-link ps-3">Logout</Link>
            </li>
            <li className="nav-item">
              <Link to="/viewvehicle" className="nav-link ps-3">View Vehicle</Link>
            </li>
          </ul>
    </div>
      </nav>
      <h1>Owner Home</h1>
      <table>
        <tr>
        <th>
         welcome {owner && owner.fname} {owner && owner.lname}
      </th>
      </tr>
      <tr>
      <td>Email</td>
      </tr>
      {/* <tr>
      <td>{owner && owner.a_id.apartmentno}</td>
      <td>{owner && owner.email_id}</td>
      </tr> */}

      
      </table>
      
      <div><img src={'data:image/jpeg;base64,${owner && owner.govn_id_img}'} width="100" height="100"/></div>
      
<button onClick={(e)=>{senddata(e)}}>Add vehicle</button>
        </div>
    );
}
export default OwnerHome;