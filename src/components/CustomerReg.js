import { useReducer,useState } from "react";
import { useNavigate,useRouteError } from "react-router-dom";

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
           /* .then(obj=>{
               const fd =new FormData();
                fd.append("file",file);
                const reqOptions1={
                  method:'POST',
                  headers:{'content-type':'multipart/form-data'},
                   body:fd
                }
                fetch("http://localhost:8080/uploadImg/"+obj.cust_id,reqOptions1)
              .then(resp=>resp.json())*/

                .then(obj=>{
                  if(obj)
                  {
                    alert("Registration successful.Try login");
                    navigate("/login");
                  }
                  else
                  {
                    alert("Registration successful.Photo upload failed.Try later");
                    navigate("/login");
                  }
                })
              //})
      
          .catch((error)=>alert("Server error.Try later"))
           

          }
    return(
        <div>
        <h1>Customer Registration</h1>
        <form>
      <div className="mb-3">
        <label htmlFor="email_id" className="form-label">Enter Email ID :</label>
        <input type="email" className="form-control" id="email_id" name="email_id" value={info.email_id} 
        onChange={(e)=>{dispatch({type:'update',fld:'email_id',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Enter password :</label>
        <input type="password" className="form-control" id="password" name="password" value={info.password}
        onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="fname" className="form-label">Enter First name :</label>
        <input type="text" className="form-control" id="fname" name="fname" value={info.fname} 
        onChange={(e)=>{dispatch({type:'update',fld:'fname',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="lname" className="form-label">Enter Last name :</label>
        <input type="text" className="form-control" id="lname" name="lname" value={info.lname} 
        onChange={(e)=>{dispatch({type:'update',fld:'lname',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="contact" className="form-label">Enter Contact no.:</label>
        <input type="number" className="form-control" id="contact" name="contact" value={info.contact} 
        onChange={(e)=>{dispatch({type:'update',fld:'contact',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="apartment_no" className="form-label">Enter Apartment no. :</label>
        <input type="number" className="form-control" id="apartment_no" name="apartment_no" value={info.apartment_no} 
        onChange={(e)=>{dispatch({type:'update',fld:'apartment_no',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="area" className="form-label">Enter Area :</label>
        <input type="text" className="form-control" id="area" name="area" value={info.area} 
        onChange={(e)=>{dispatch({type:'update',fld:'area',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">Enter City :</label>
        <input type="text" className="form-control" id="city" name="city" value={info.city} 
        onChange={(e)=>{dispatch({type:'update',fld:'city',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">Enter State :</label>
        <input type="text" className="form-control" id="state" name="state" value={info.state} 
        onChange={(e)=>{dispatch({type:'update',fld:'state',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form-label">Enter Country :</label>
        <input type="text" className="form-control" id="country" name="country" value={info.country} 
        onChange={(e)=>{dispatch({type:'update',fld:'country',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="pincode" className="form-label">Enter Pincode :</label>
        <input type="number" className="form-control" id="pincode" name="pincode" value={info.pincode} 
        onChange={(e)=>{dispatch({type:'update',fld:'pincode',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Enter Age :</label>
        <input type="number" className="form-control" id="age" name="age" value={info.age} 
        onChange={(e)=>{dispatch({type:'update',fld:'age',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="dl_number" className="form-label">Enter Driving License Number :</label>
        <input type="number" className="form-control" id="dl_number" name="dl_number" value={info.dl_number} 
        onChange={(e)=>{dispatch({type:'update',fld:'dl_number',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="dl_image" className="form-label">Enter Driving License Image :</label>
        <input type="file" className="form-control" id="dl_image" name="dl_image" 
        onChange={(e)=> setfile(e.target.files[0])}/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
      <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
    </form>
        </div>
    )
}