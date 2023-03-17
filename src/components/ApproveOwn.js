import {useReducer, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

var ApproveOwn = ()=>{

    const [utown,setUOwn] = useState([]);
    useEffect(()=>{
     fetch("http://localhost:8080/unapproveOwn")
     .then(resp => resp.json())
     .then(obj => setUOwn(obj))
    } ,[])

	const nav = useNavigate();
	
	const approve = (own_id) =>{
		console.log(own_id)
		fetch("http://localhost:8080/approveOwn?own_id="+own_id)
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
					<h4 class="text-center text-primary mb-4">List of Remaining Approvals </h4>
					<div class="table-wrap">
						<table class="table">
					    <thead class="thead-primary">
					      <tr>
					        <th>Owner ID</th>
					        <th>Owner Name</th>
					        <th>Contact</th>					        
					        <th colSpan="2" style={ {textAlign:"center"}}>Remark </th>		
					      </tr>
			
					    </thead>
						<tbody>
{
	utown.map(ut =>{

		return <tr key={ut.own_id}> <td>{ut && ut.own_id}</td>
		<td>{ut && ut.fname} {ut && ut.lname}</td>
		<td>{ut && ut.contact}</td>
		<td><button onClick={()=>{approve(ut.own_id)}} className="btn btn-success">Approve</button></td>
		
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
export default ApproveOwn ;