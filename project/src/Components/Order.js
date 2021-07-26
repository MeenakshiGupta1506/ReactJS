import Cartitem from "./cartitem.js";
import axios from "axios"
import {useState,useEffect} from "react"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Orderitem from "./Orderitem"
import {Redirect} from "react-router-dom"



function Order(){
    var [cakesresult,setCakesresult] = useState([])
    
    useEffect(function(){
        axios({
            method : "post",
            url : "https://apibyashu.herokuapp.com/api/cakeorders",
            data : {
                email : localStorage.email
            },
            headers:{
                authtoken:localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
            setCakesresult(response.data.cakeorders)
        },(error)=>{
            console.log("error from searchcakes api",error)
        })
    },[])
    console.log(cakesresult)
   
    if(!localStorage.token)
      {
          return(
              <Redirect to="/"></Redirect>
          )
      }
      else{
    return(
        <div className="container">
                {cakesresult.length>0 && <div>
                <center><h1>Your Orders</h1></center>
                <hr></hr>
                <div class="accordion" id="accordionExample">
                {cakesresult.map(function(each){
                    return(
                    <Orderitem order={each}></Orderitem>
                    );
                })}
                </div>
                </div>}
                {!cakesresult.length>0 && <div>
                <center><h1>Order list is empty</h1></center>
                </div>} 
        </div>
    )}
}

export default Order;