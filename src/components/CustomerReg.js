import { useReducer,useState } from "react";
import { useNavigate,useRouteError } from "react-router-dom";
import './Reg.css';


export default function CustomerReg(){
    const init={
        email_id:"",
        password:"",
        fname:"",
        lname:"",
        contact:"",
        apartment_no:"",
        area:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
        dl_number:""
      
        
     
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
     
          const[info,dispatch]=useReducer(reducer,init);
          const [file,setfile]=useState();
          const navigate=useNavigate();
          const[emailidstatus,setEmailIdStatus] = useState(true);
  const[passwordstatus,setPasswordStatus] = useState(true);
  const[contactstatus,setContactStatus] = useState(true);

  const validationEmail=(value)=>{

    const exp1=/^\w{6,}\@\w{4,}\.\w{2,}$/

    if(!exp1.test(value))
    {
     setEmailIdStatus(false);
    }
    else
    {
     setEmailIdStatus(true);
    }

   // const exp2=/(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%&*])[A-Za-z0-9~!@#\s$%&*]{5,}/

 }

 const validationPassword=(value)=>{

   const exp2=/(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%&*])[A-Za-z0-9~!@#\s$%&*]{5,}/

   if(!exp2.test(value))
   {
     setPasswordStatus(false);
   }
   else{
     setPasswordStatus(true);
   }


 }

 const validationContact=(value)=>{

   const  exp3=/^[0-9]{10}$/

   if(!exp3.test(value))
   {
     setContactStatus(false);
   }
   else{
     setContactStatus(true);
   }



 }



          const sendData=(e)=>{
            e.preventDefault();

            const reqOptions={
              method:'POST',
              headers:{'content-type':'application/json'},
              body:JSON.stringify(info)
              
            }
            console.log(info)
            fetch("http://localhost:8080/regCustomer",reqOptions)
            .then(resp=>{
              if(resp.ok)
              return resp.json();
              else
              throw new Error("server error");
            })
            .then(obj=>{
               const fd =new FormData();
                fd.append("file",file);
                const reqOptions1={
                  method:'POST',
                
                   body:fd
                }
                fetch("http://localhost:8080/uploadImage/"+obj.cust_id,reqOptions1)
              .then(resp=>resp.json())

                .then(obj=>{
                  if(obj)
                  {
                    alert("Registration Not yet Approved !! Try login");
                    navigate("/login");
                  }
                  else
                  {
                    alert("Registration successful.Photo upload failed.Try later");
                    navigate("/login");
                  }
                })
              })
      
          .catch((error)=>alert("Server error.Try later"))
           

          }
    return(
      
      <div class="bg-img-cust">
        <div className="Auth-form-container">
        <form className="Auth-form">
      <div className="Auth-form-content">
      <h3 className="Auth-form-title">Customer Registration</h3> 
      <div className="form-group mt-3"> 
        <input type="email" className="form-control mt-1" placeholder="Enter email" id="email_id" name="email_id" value={info.email_id} 
        onChange={(e)=>{dispatch({type:'update',fld:'email_id',val:e.target.value}); validationEmail(e.target.value);
      }}/>
        </div>
         {/*validation for emailid */}
         <div className="form-group mt-3"style={{ display: emailidstatus ? "none" : "block" }} >
              <p style={{color:"red"}}>Invalid emaiid</p>
            </div>

      </div>
      <div className="form-group mt-3">
        <input type="password" className="form-control mt-1"placeholder="Enter password" id="password" name="password" value={info.password}
        onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value}); validationPassword(e.target.value);
      }}/>
      </div>
          {/*validation for password */}
          <div className="form-group mt-3"style={{ display: passwordstatus ? "none" : "block" }} >
              <p style={{color:"red"}}>Invalid password</p>
            </div>
           

      <div className="form-group mt-3">
        <input type="text" className="form-control mt-1"placeholder="first name" id="fname" name="fname" value={info.fname} 
        onChange={(e)=>{dispatch({type:'update',fld:'fname',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="text" className="form-control mt-1"placeholder="last name" id="lname" name="lname" value={info.lname} 
        onChange={(e)=>{dispatch({type:'update',fld:'lname',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="number" className="form-control mt-1"placeholder="contact no" id="contact" name="contact" value={info.contact} 
        onChange={(e)=>{dispatch({type:'update',fld:'contact',val:e.target.value}); validationContact(e.target.value);
      }}/>
      </div>
       {/*validation for contact */}
       <div className="form-group mt-3"style={{ display: contactstatus ? "none" : "block" }} >
              <p style={{color:"red"}}>contact number should of 10 digit only</p>
            </div>

      <div className="form-group mt-3">
        <input type="number" className="form-control mt-1"placeholder="Apartment no" id="apartment_no" name="apartment_no" value={info.apartment_no} 
        onChange={(e)=>{dispatch({type:'update',fld:'apartment_no',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="text" className="form-control mt-1"placeholder="Area" id="area" name="area" value={info.area} 
        onChange={(e)=>{dispatch({type:'update',fld:'area',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        
        <select className="form-control mt-1"placeholder="city" id="city" name="city" value={info.city} 
        onChange={(e)=>{dispatch({type:'update',fld:'city',val:e.target.value})}}>
          <option>Select One</option>
          <option>Ahmadnagar</option><option>Akola</option><option>Amravati</option>
          <option>Aurangabad</option>
          <option>Beed</option><option>Bhandara</option><option>Buldhana</option>
          <option>Chandrapur</option><option>Dhule</option><option>Gadchiroli</option>
          <option>Gondia</option>
          <option>Hingoli</option>
          <option>Jalgaon</option>
          <option>Jalna</option>
          <option>Kolhapur</option>
          <option>Latur</option>
          <option>Mumbai City</option>
          <option>Mumbai Suburban</option>
          <option>Nagpur</option>
          <option>Nanded</option>
          <option>Nandurbar</option>
          <option>Nashik</option>
          <option>Osmanabad</option>
          <option>Palghar</option>
          <option>Parbhani</option>
          <option>Pune</option>
          <option>Raigad</option>
          <option>Ratnagiri</option>
          <option>Sangli</option>
          <option>Satara</option>
          <option>Sindhudurg</option>
          <option>Solapur</option>
          <option>Thane</option>
          <option>Wardha</option>
          <option>Washim</option>
          <option>Yavatmal</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <input type="text" className="form-control mt-1"placeholder="state" id="state" name="state" value="Maharashtra" 
        onChange={(e)=>{dispatch({type:'update',fld:'state',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="text" className="form-control mt-1"placeholder="Country" id="country" name="country" value="India" 
        onChange={(e)=>{dispatch({type:'update',fld:'country',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="number" className="form-control mt-1"placeholder="pincode" id="pincode" name="pincode" value={info.pincode} 
        onChange={(e)=>{dispatch({type:'update',fld:'pincode',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="number" className="form-control mt-1"placeholder="age" id="age" name="age" value={info.age} 
        onChange={(e)=>{dispatch({type:'update',fld:'age',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="number" className="form-control mt-1"placeholder="Driving License" id="dl_number" name="dl_number" value={info.dl_number} 
        onChange={(e)=>{dispatch({type:'update',fld:'dl_number',val:e.target.value})}}/>
      </div>
      <div className="form-group mt-3">
        <input type="file" className="form-control mt-1"placeholder="Driving License Image"id="dl_image" name="dl_image" 
        onChange={(e)=> setfile(e.target.files[0])}/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
      <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
    </form>
        </div>
        </div>
        
    )
}