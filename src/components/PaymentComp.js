import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ThankComp from "./ThankComp";
function PaymentComp()
{
   
  
    const vehicle=JSON.parse(localStorage.getItem("showVehicle"));
    console.log(vehicle)
     const customer=JSON.parse(localStorage.getItem("loggedcustomer"));
     console.log(customer)
    
     const [vehOwner,setvehOwner]=useState(null);
  useEffect(()=>{
     const vehOwn_id =JSON.parse(localStorage.getItem("showVehicle")).own_id
    fetch("http://localhost:8080/OwnerObj?own_id="+vehOwn_id)
    .then(resp=>resp.json())
    .then(obj=>{
        console.log("Hello monali:")
        console.log(obj)
        localStorage.setItem("vehicleowner",JSON.stringify(obj))
        setvehOwner(obj);
      })
    },[])

    const Booked=JSON.parse(localStorage.getItem("BookedVehicle"))
   console.log(Booked);
   const start = new Date(Booked.issue_date);
   const end = new Date(Booked.return_date);
   const rentalDurationHours = Math.floor((end - start) / (1000 * 60 * 60));

   console.log( rentalDurationHours);
   // calculate rental duration in days
   const rentalDurationDays = Math.ceil(rentalDurationHours / 24);
   console.log(rentalDurationDays );
   // calculate total cost
const charges_per_hour = (rentalDurationHours * vehicle.charges_per_hour); 
console.log(charges_per_hour);
const charges_per_day= (rentalDurationDays * vehicle.charges_per_day);
console.log(charges_per_day);

// if(rentalDurationHours%24===0)
// {
 
  const TotalCost=rentalDurationDays * vehicle.charges_per_day;
  console.log(TotalCost);
//}

// else{

//  setTotalCost(rentalDurationHours * vehicle.charges_per_hour)
//   console.log(TotalCost);
// }

//       navigate('/PaymentComp',
//  {
//     state:
//     {TotalCost}

//    });
// const location=useLocation();
const navigate=useNavigate();
const handleButton=()=>
{
    navigate("/ThankComp");
}

    return(
        <div class="bg-img-bookdetail">
            <h2>Booking Confirmation</h2>
            <table class="table table-bordered">
                <tr>
                    <td><h5>Vehicle name</h5></td>
                    <td> {vehicle && vehicle.veh_name}
                    {vehicle && vehicle.plate_number}</td>
                </tr>
                <tr>
                    <td><h5>Customer name:</h5></td>
                    <td> {customer && customer.fname} {customer && customer.lname}</td>
                </tr>
                <tr>
                    <td><h5>Vehicle Owner Details:</h5></td>
                    <td>Owner name: {vehOwner && vehOwner.fname} {vehOwner && vehOwner.lname}<br/>
                    Contact :  {vehOwner && vehOwner.contact}<br/>
                    </td>
                </tr>
                <tr>
                    <td><h5>PickUp Location:</h5></td>
                    
                  
                    {/* <td>{vehOwner.a_id && vehOwner.a_id.apartment_no},{vehOwner.a_id && vehOwner.a_id.area}
                    {vehOwner.a_id && vehOwner.a_id.city}</td> */}
                </tr>
                <tr>
                    <td><h5>Total Cost: </h5></td>
                    <td>{TotalCost}</td>
                </tr>
                
            </table>
            <button onClick={handleButton} class="col-3 btn btn-primary mb-4">Confirm Booking</button>

        </div>
    )
}
export default PaymentComp;