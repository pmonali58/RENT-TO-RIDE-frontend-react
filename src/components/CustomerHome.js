import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import './custhome.css';
function CustomerHome(){

  const [customer,setCustomer]=useState(null);
  useEffect(()=>{
    
    const loginid=JSON.parse(localStorage.getItem("loggeduser")).login_id;
    fetch("http://localhost:8080/getCustomer?login_id="+loginid)
    .then(resp=>resp.json())
    .then(obj=>{
      console.log("Hello:")
      console.log(obj)
      localStorage.setItem("loggedcustomer",JSON.stringify(obj))
      setCustomer(obj);
    })
  },{})
    return(
      <div class="bg-img-custhome">
     
      <nav className="navbar navbar-expand-sm bg-info mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/logout" className="nav-link ps-3">LogOut</Link>
            </li>
            <li className="nav-item">
              <Link to="/VehicleList" className="nav-link ps-3">Book Vehicle</Link>
            </li>
          </ul>
          
    </div>
      </nav>
          <h1 class="text-danger"> Customer Home</h1>
          <h1>welcome {customer && customer.fname} {customer && customer.lname}</h1>

        </div>
        
    );
}
export default CustomerHome;