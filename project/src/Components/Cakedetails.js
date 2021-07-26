import {Redirect, useParams, withRouter} from "react-router-dom"
import { useState } from "react"
import data from "./data"
import axios from "axios"
import FA from "react-fontawesome"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Cakedetails(props){    
    var {cakeid} = useParams()
    var [cake,setCake] = useState(data.cake)
    console.log(">>>>>>>>>>> cake id from data.js file" , data.cake.cakeid)
    if(data.cake.cakeid!=cakeid){
        // bring all the details of that cake from backend
        var apiurl = "httpS://apibyashu.herokuapp.com/api/cake/"+cakeid
        axios({
            url:apiurl,
            method:"get"
        }).then((response)=>{
            console.log("all the details of selected cake response", response)
            data.cake = response.data.data
            setCake(response.data.data)

        },(error)=>{
            console.log(">>>>> error from cake details api", error)
        })
    
    }
    function AddtoCart(){
        if(!localStorage.token)
        {
            props.history.push("/login")
        }
        else{
            var cart = {}
            cart.email = localStorage.email
            cart.cakeid = cake.cakeid
            cart.name = cake.name
            cart.price = cake.price
            cart.weight = cake.weight
            cart.image = cake.image
            axios({
                url : "httpS://apibyashu.herokuapp.com/api/addcaketocart",
                method : "post",
                data : cart,
                headers:{
                    authtoken:localStorage.token
                }
            }).then((response)=>{
                if(response.data.data){
                    toast.success("Added in Cart")
                }
                console.log("response from add to cart api",response)
            },(error)=>{
                console.log("error from add to cart api",error)
            })
            console.log(cart)
        }
    }
    return (
        <div className="container" style={{marginTop:"30px"}}>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-4">
                        <img src={cake.image} alt="..." style={{ width: "400px", height: "500px" }}></img>
                    </div>
                    <div className="col-4">
                        <div className="card-body">

                            <h5 className="card-title">{cake.name}</h5>
                            <p><FA name="star">{cake.ratings}</FA></p>
                            <p className="card-text">{cake.description}</p>
                            <p className="card-text"><strong>Flavour: </strong>{cake.flavour}</p>
                            <p>{cake.eggless && <div><FA style={{"color":"green"}} name="circle"></FA>  <label>Eggless</label></div>}
                            {!cake.eggless && <div><FA style={{"color":"red"}} name="circle"></FA>  <label>Contain Egg</label></div>}
                            </p>
                            <p className="card-text"><strong>Weight: </strong>{cake.weight} Kg</p>
                            <p className="card-text"><strong>Ocassion : </strong>{cake.type}</p>
                            <strong>Ingredients:</strong>
                            <ul>
                                {cake.ingredients && cake.ingredients.length>0 &&cake.ingredients.map((each)=>{
                                    return <li>{each}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-2" style={{ "margin-top": "20px" }}>
                        <label><h4>Rs. {cake.price}</h4></label>
                    </div>
                    <div className="col-2" style={{ "margin-top": "20px" }}>
                        <button type="button" class="btn btn-primary" onClick={AddtoCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            
        </div>
    
    )
}

export default Cakedetails