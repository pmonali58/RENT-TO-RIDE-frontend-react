import { Link } from "react-router-dom";
function CustomerHome(){
    return(
        <div>
          <h1>Customer Home Page</h1>
           <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container-fluid">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/logout" className="nav-link ps-3">Logout</Link>
                  <Link to="/updateprofile" className="nav-link ps-3"> Update Profile</Link>
                </li>
              </ul>
            </div>
          </nav>
      
        </div>
    );
}
export default CustomerHome;