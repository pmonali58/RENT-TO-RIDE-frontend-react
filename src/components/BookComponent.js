
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PaymentComp from "./PaymentComp";
function Bookcomponent()
{    
  const [TotalCost,setTotalCost]=useState();
    const init=
    {
        "veh_id":0,
        "cust_id":0,
       "issue_date":"",
       "return_date":""
    }

    const reducer=(state,action)=>
          {
           switch(action.type)
           {
             case 'update':
               return {...state, [action.fld]:action.val}
             
             case 'reset':
               return init; 
           
           }
          }
     
        
    const location=useLocation();
    var vehicle=location.state.vehicle;
   console.log(vehicle);
   localStorage.setItem("showVehicle",JSON.stringify(vehicle))
   
  //   const handleVehicleSelection = (TotalCost)=>
  //   {
  //  navigate('/PaymentComp',
  //  {
  //     state:
  //     {TotalCost}
  
  //    });
    
  //   }

          const[info,dispatch]=useReducer(reducer,init);
          const navigate=useNavigate();
         
          const sendData=(e)=>{
            e.preventDefault();
           
        info.veh_id=vehicle.veh_id;
        
        info.cust_id=JSON.parse(localStorage.getItem("loggedcustomer")).cust_id;
        console.log(info);
         const reqOptions={
      
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(info)


      }
      fetch("http://localhost:8080/Booking",reqOptions)
      .then(resp=>resp.json())
          .then(obj=>{
            if(obj)  
            {
              alert("Booking Successfull...");
              localStorage.setItem("BookedVehicle",JSON.stringify(obj));
              navigate("/PaymentComp");
            }
          })
      
          }
    return (
      <div class="bg-img-bookveh">
        <div className="Auth-form-container">
          
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Booking Details</h3>
              <div className="form-group mt-3">
                <label>Issue Date Time</label>
                <input
                  type="datetime-local"
                  id="issue_date"
                  name="issue_date"
                  className="form-control mt-1"
                  placeholder="issueDateTime"
                  value={info.issue_date}
                  onChange={(e) => { dispatch({ type: 'update', fld: 'issue_date', val: e.target.value }) }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Return Date Time</label>
                <input
                  type="datetime-local"
                  id="return_date"
                  name="return_date"
                  className="form-control mt-1"
                  placeholder="returnDateTime"
                  value={info.return_date}
                  onChange={(e) => { dispatch({ type: 'update', fld: 'return_date', val: e.target.value }) }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={(e) => { sendData(e)  }}>
                  Submit
                </button>
                <button type="reset" className="btn btn-primary" onClick={() => { dispatch({ type: 'reset' }) }}  >
                  Clear
                </button>
               
              </div>
              <p>{JSON.stringify(info)}</p>
              
            </div>

          </form>
          </div>
        
          </div>
          
    )
    
     
         
}

export default Bookcomponent;