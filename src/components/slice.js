import { createSlice } from "@reduxjs/toolkit";

export const loggedSlice=createSlice({
    name:"logged",
    initialState:{
        loggedIn:false,
        own_id:0
        
        
    },
reducers:{

    
    login:(state,action)=>{console.log("in login action");return{loggedIn:true,
    own_id:action.payload.own_id
    
    }},

    logout:(state)=>{console.log("in logout");return{loggedIn:false}

}}
})
export const{login,logout}=loggedSlice.actions
export default loggedSlice.reducer;