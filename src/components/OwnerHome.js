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
        <div class="bg-img-custhome">
     
      <nav className="navbar navbar-expand-sm bg-info mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/logout" className="nav-link ps-3">LogOut</Link>
            </li>
            <li className="nav-item">
              <Link to="/viewvehicle" className="nav-link ps-3">View Vehicle</Link>
            </li>
          </ul>
          
    </div>
      </nav>
      <h1 class="text-danger"> Owner Home</h1>
          <h1>welcome {owner && owner.fname} {owner && owner.lname}</h1>
      
<button onClick={(e)=>{senddata(e)}} class="col-3 btn btn-primary mb-4">Add vehicle</button>
        </div>
    );
}
export default OwnerHome;