import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AdminHome(){

  const [admin,setAdmin]=useState(null);
  useEffect(()=>{
    
    const loginid=JSON.parse(localStorage.getItem("loggeduser")).login_id;
    fetch("http://localhost:8080/getAdmin?login_id="+loginid)
    .then(resp=>resp.json())
    .then(obj=>{
      console.log("Hello:")
      console.log(obj)
      localStorage.setItem("loggedadmin",JSON.stringify(obj))
      setAdmin(obj);
    })
  },{})
  // Set the Admin ID in local storage


 
    return(
     < div class="bg-img-custhome">    
       <nav className="navbar navbar-expand-lg  bg-info ">
        <div className="container-fluid">
          <ul className="navbar-nav">
            
            <li className="nav-item">
             <Link to="/ApproveCust"  className="nav-link ps-3">Approve Customer</Link>
            </li>
            <li className="nav-item">
              <Link to="/ApproveOwn"   className="nav-link ps-3">Approve Owner</Link>
            </li>
          <li className="nav-item">
         <Link to="/ApproveVeh"  className="nav-link ps-3">Approve Vehicle</Link>
            </li>
            <li  className="nav-item">
              <Link to="/logout"   className="nav-link ps-3">Logout</Link>
            </li>
          </ul>
          
    </div>
      </nav>
      <h1 class="text-danger" >Admin Home</h1>
      <h2 >welcome {admin && admin.fname} {admin && admin.lname} </h2>
      
      </div>
    );
}
export default AdminHome;