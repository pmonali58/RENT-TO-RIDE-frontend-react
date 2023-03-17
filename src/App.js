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
import CustomerHome from './components/CustomerHome';
import VehicleList from './components/VehicleList';
import Bookcomponent from './components/BookComponent';
import PaymentComp from './components/PaymentComp';
import ThankComp from './components/ThankComp';
import AdminHome from './components/AdminHome';
import ApproveCust from './components/ApproveCust';
import ApproveOwn from './components/ApproveOwn';
import ApproveVeh from './components/ApproveVeh';
import AdminReg from './components/AdminReg';
 

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
              <Link to="OwnerReg" className="nav-link ps-3">Owner Registration</Link>
            </li>
            <li className="nav-item">
              <Link to="CustomerReg" className="nav-link ps-3">Customer Registration</Link>
            </li>
            <li className="nav-item">
              <Link to="AdminReg" className="nav-link ps-3">Admin Registration</Link>
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
        <Route path="CustomerHome" element={<CustomerHome/>}/>
        <Route path="VehicleList" element={<VehicleList/>}/>
        <Route path="BookComponent" element={<Bookcomponent/>}/>
        <Route path="PaymentComp" element={<PaymentComp/>}/>
        <Route path="ThankComp" element={<ThankComp/>}/>
        <Route path="AdminHome" element={<AdminHome/>}/>
        <Route path="ApproveCust" element={<ApproveCust/>}/>
        <Route path="ApproveOwn" element={<ApproveOwn/>}/>
        <Route path="ApproveVeh" element={<ApproveVeh/>}/>
        <Route path="AdminReg" element={<AdminReg/>}/>
         
      </Routes>
      
    </div>
  );
}

export default App;
