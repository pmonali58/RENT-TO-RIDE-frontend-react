import {useReducer, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

var ApproveVeh = ()=>{

    const [utveh,setUVeh] = useState([]);
    useEffect(()=>{
     fetch("http://localhost:8080/unapproveVeh")
     .then(resp => resp.json())
     .then(obj => setUVeh(obj))
    } ,[])

	const nav = useNavigate();
	
	const approve = (veh_id) =>{
		console.log(veh_id)
		fetch("http://localhost:8080/approveVeh?veh_id="+veh_id)
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
					<h4 class="text-center text-primary mb-4">List of  Remaining Approvals </h4>
					<div class="table-wrap">
						<table class="table">
					    <thead class="thead-primary">
					      <tr>
					        <th>Vehicle ID</th>
					        <th>Vehicle Name</th>	        
					        <th colSpan="2" style={ {textAlign:"center"}}>Remark </th>		
					      </tr>
			
					    </thead>
						<tbody>
{
	utveh.map(ut =>{

		return <tr key={ut.veh_id}> <td>{ ut && ut.veh_id}</td>
		<td>{ut && ut.veh_name} </td>
		
		<td><button onClick={()=>{approve(ut.veh_id)}} className="btn btn-success">Approve</button></td>
		
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
export default ApproveVeh ;