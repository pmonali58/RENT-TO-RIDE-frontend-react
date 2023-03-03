import { useReducer } from "react";

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
        pincode:""
        
     
          }
          const reducer=(state,action)=>{
           switch(action.type){
             case 'update':
               return {...state, [action.fld]:action.val}
             
             case 'reset':
               return init; 
           
           }
          }
     
          const[info,dispatch]=useReducer(reducer,init);

          const sendData=(e)=>{
            e.preventDefault();
           

          }
    return(
        <div>
        <h1>Customer Registration</h1>
        <form>
      <div className="mb-3">
        <label htmlfor="email_id" classname="form-label">Enter EmailID :</label>
        <input type="text" className="form-control" id="emailid" name="emailid" value={info.email_id} 
        onChange={(e)=>{dispatch({type:'update',fld:'email_id',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="password" classname="form-label">Enter password :</label>
        <input type="password" className="form-control" id="password" name="password" value={info.password}
        onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="fname" classname="form-label">Enter First name :</label>
        <input type="text" className="form-control" id="fname" name="fname" value={info.fname} 
        onChange={(e)=>{dispatch({type:'update',fld:'fname',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="lname" classname="form-label">Enter Last name :</label>
        <input type="text" className="form-control" id="lname" name="lname" value={info.lname} 
        onChange={(e)=>{dispatch({type:'update',fld:'lname',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="contact" classname="form-label">Enter Contact no.:</label>
        <input type="number" className="form-control" id="contact" name="contact" value={info.contact} 
        onChange={(e)=>{dispatch({type:'update',fld:'contact',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="apartment_no" classname="form-label">Enter Apartment no. :</label>
        <input type="number" className="form-control" id="apartment_no" name="apartment_no" value={info.apartment_no} 
        onChange={(e)=>{dispatch({type:'update',fld:'apartment_no',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="area" classname="form-label">Enter Area :</label>
        <input type="text" className="form-control" id="area" name="area" value={info.area} 
        onChange={(e)=>{dispatch({type:'update',fld:'area',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="city" classname="form-label">Enter City :</label>
        <input type="text" className="form-control" id="city" name="city" value={info.city} 
        onChange={(e)=>{dispatch({type:'update',fld:'city',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="state" classname="form-label">Enter State :</label>
        <input type="text" className="form-control" id="state" name="state" value={info.state} 
        onChange={(e)=>{dispatch({type:'update',fld:'state',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="country" classname="form-label">Enter Country :</label>
        <input type="text" className="form-control" id="country" name="country" value={info.country} 
        onChange={(e)=>{dispatch({type:'update',fld:'country',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="pincode" classname="form-label">Enter Pincode :</label>
        <input type="number" className="form-control" id="pincode" name="pincode" value={info.pincode} 
        onChange={(e)=>{dispatch({type:'update',fld:'pincode',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="govn_id_no" classname="form-label">Enter Pincode :</label>
        <input type="number" className="form-control" id="govn_id_no" name="govn_id_no" value={info.govn_id_no} 
        onChange={(e)=>{dispatch({type:'update',fld:'govn_id_no',val:e.target.value})}}/>
      </div>
      <div className="mb-3">
        <label htmlfor="govn_id_img" classname="form-label">Enter Pincode :</label>
        <input type="file" className="form-control" id="govn_id_img" name="govn_id_img" />
      </div>

      <button type="submit" className="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>
      <button type="reset" className="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
    </form>
        </div>
    )
}