import { useReducer,useState } from "react";
import { useNavigate,useRouteError } from "react-router-dom";
function AdminReg()
{
    const init={
        email_id:"",
        password:"",
        fname:"",
        lname:"",
        contact:""
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
            fetch("http://localhost:8080/regAdmin",reqOptions)
            .then(resp=> resp.json())
            .then(obj=>{
                if(obj)  
                {
                  alert("Registration Successfull try login");
                  navigate("/login");
                }
              })

          }
          return(
      
            <div class="bg-img-cust">
              <div className="Auth-form-container">
              <form className="Auth-form">
            <div className="Auth-form-content">
            <h3 className="Auth-form-title">Admin Registration</h3> 
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

            <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
            <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
          </form>
              </div>
              </div>
              
          )

}
export default AdminReg;