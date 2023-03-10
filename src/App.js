import logo from './logo.svg';
import './App.css';
import LoginComp from './components/LoginComp';
import OwnerHome from './components/OwnerHome';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useSelector } from 'react-redux';
import LogoutComp from './components/LogoutComp';
import OwnerReg from './components/OwnerReg';
import CustomerReg from './components/CustomerReg';
import VehicleReg from './components/VehicleReg';
import ViewVehicle from './components/ViewVehicle';
 

function App() {
  const mystate=useSelector((state)=>state.logged);
  return (
    
    <div className="App">
      <div style={{display:mystate.loggedIn?"none":"block"}}>
      <nav className="navbar navbar-expand-sm bg-light mb-3">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link ps-3">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="login" className="nav-link ps-3">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="OwnerReg" className="nav-link ps-3">OwnerRegistration</Link>
            </li>
            <li className="nav-item">
              <Link to="CustomerReg" className="nav-link ps-3">CustomerRegistration</Link>
            </li>
          </ul>
    </div>
      </nav>
      
      </div>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="login" element={<LoginComp/>}/>
        <Route path="OwnerReg" element={<OwnerReg/>}/>
        <Route path="OwnerHome" element={<OwnerHome/>}/>
        <Route path="VehicleReg" element={<VehicleReg/>}/>
        <Route path="viewvehicle" element={<ViewVehicle/>}/>
        <Route path="logout" element={<LogoutComp/>}/>
        <Route path="CustomerReg" element={<CustomerReg/>}/>

      </Routes>
    </div>
  );
}

export default App;
