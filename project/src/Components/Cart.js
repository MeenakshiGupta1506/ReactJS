import Cartitem from "./cartitem.js";
import axios from "axios"
import {useState,useEffect} from "react"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, withRouter} from "react-router-dom"




function Cart(props){
    var [cakesresult,setCakesresult] = useState([])
    var removefromcart = (index)=>{
        cakesresult.splice(index,1)
        var temp = [...cakesresult]
        setCakesresult(temp)
        toast.success("Item has removed")
    }
    useEffect(function(){
        axios({
            method : "post",
            url : "https://apibyashu.herokuapp.com/api/cakecart",
            data : {
                email : localStorage.email
            },
            headers:{
                authtoken:localStorage.token
            }
        }).then((response)=>{
            console.log(response.data)
            setCakesresult(response.data.data)
        },(error)=>{
            console.log("error from searchcakes api",error)
        })
    },[])
    console.log(cakesresult)
    var price = 0;
    var item = 0;
    for (let i=0; i<cakesresult.length;i++) {
         price += cakesresult[i].price
         item +=1
    }
    function CheckoutObj(){
        var url = "/checkout?cakes="+JSON.stringify(cakesresult)+"&price="+price
        props.history.push(url)
      }
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
                <center><h1>Your Cart</h1></center>
                <hr></hr>
                {cakesresult.map(function(each,index){
                    return(
                    <Cartitem removefromcart={removefromcart} key1={index} cart={each}></Cartitem>
                    );
                })}
                <div style={{"border":"2px solid black"}}>
                    <div style={{"margin":"20px"}}>
                    <strong>Total Price : Rs. {price}</strong><br></br>
                    <strong>Total Item : {item}</strong>
                    </div>
                    </div><br></br>
                <div className="text-end">
                    <button type="button" className="btn btn-primary" onClick={CheckoutObj}>Checkout</button>
                </div>
                </div>}
                {!cakesresult.length>0 && <div>
                <center><h1>Cart is empty</h1></center>
                </div>} 
            </div>
    );}
}

export default Cart;