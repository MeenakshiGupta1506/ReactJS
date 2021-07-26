import FA from "react-fontawesome";
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CartItem(props) {
    function removeFromCart(event){
        event.preventDefault()
        axios({
            url : "httpS://apibyashu.herokuapp.com/api/removecakefromcart",
            method : "post",
            data : {
                cakeid:props.cart.cakeid,
                email:props.cart.email
            },
            headers:{
                authtoken:localStorage.token
            }
        }).then((response)=>{
            props.removefromcart(props.key1)
            
        },(error)=>{
            console.log("error from add to cart api",error)
        })
    }

    
    return(
        <div className="row" style={{marginTop:"20px"}}>
            
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div className="row">
                    
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <img src={props.cart.image} style={{height:"100px",width:"100px"}}></img>
                    </div>
                    
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>{props.cart.name}</label>
                    </div>
                    
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>Rs. {props.cart.price}</label>
                    </div>
                    
                </div>
            </div>
            
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <button type="button" className="btn btn-danger" onClick={removeFromCart}><FA name="trash"/></button>
            </div>
            <hr></hr>
        </div>
    )
}

export default CartItem;