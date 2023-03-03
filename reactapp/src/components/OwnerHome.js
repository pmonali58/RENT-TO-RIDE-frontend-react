import { Link } from "react-router-dom";
function OwnerHome(){
    return(
        <div>
          <h1>Owner Home Page</h1>
           <nav className="navbar navbar-expand-sm bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/logout" className="nav-link ps-3">Logout</Link>
            </li>
          
          </ul>
    </div>
      </nav>
      
        </div>
    );
}
export default OwnerHome;