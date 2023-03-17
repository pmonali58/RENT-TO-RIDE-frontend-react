import {useReducer, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

var ApproveCust = ()=>{

    const [ucus,setUCus] = useState([]);
    useEffect(()=>{
     fetch("http://localhost:8080/unapproveCust")
     .then(resp => resp.json())
     .then(obj => setUCus(obj))
    } ,[])

	const nav = useNavigate();
	
	const approve = (cust_id) =>{
		console.log(cust_id)
		fetch("http://localhost:8080/approveCust?cust_id="+cust_id)
     .then(resp => resp.json())
     .then(obj => { console.log(JSON.stringify(obj))
		if(obj)
		{
			alert("Updation done")
			nav("/AdminHome")
			window.location.reload();
		}
		else
			alert("Updation failed")
	
	})
	}
    return(
        <div>
<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<h4  class="text-center text-primary mb-4">List of Remaining Approvals </h4>
					<div class="table-wrap">
						<table class="table">
					    <thead class="thead-secondary">
					      <tr>
					        <th>Customer ID</th>
					        <th>Customer Name</th>
					        <th>Contact</th>				        
					        <th colSpan="2" style={ {textAlign:"center"}}>Remark </th>		
					      </tr>
			
					    </thead>
						<tbody>
{
	ucus.map(ut =>{

		return <tr key={ut.cust_id}> <td>{ut && ut.cust_id}</td>
		<td>{ut && ut.fname} {ut && ut.lname}</td>
		<td>{ut && ut.contact}</td>
		<td><button onClick={()=>{approve(ut.cust_id)}} className="btn btn-success">Approve</button></td>
		</tr>

	})
}
					    </tbody>
					  </table>
					</div>
				</div>
			</div>
		</div>
        </div>
    )
}
export default ApproveCust ;