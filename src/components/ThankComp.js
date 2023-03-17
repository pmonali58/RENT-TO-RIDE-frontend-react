import { Link } from "react-router-dom";

function ThankComp()
{
    const customer=JSON.parse(localStorage.getItem("loggedcustomer"))
    return(
        <div class="bg-img-thank">
     
    <nav className="navbar navbar-expand-sm bg-warning mb-3">
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
        
           
               <h1>  {customer && customer.fname}  {customer && customer.lname}</h1>
        </div>
    )

}
export default ThankComp;