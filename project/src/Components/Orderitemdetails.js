import FA from "react-fontawesome";
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Orderitemdetails(props) {

    return(
        <div className="row" style={{marginTop:"20px"}}>
            
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <div className="row">
                    
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <img src={props.orderdetails.image} style={{height:"100px",width:"100px"}}></img>
                    </div>
                    
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>{props.orderdetails.name}</label>
                    </div>
                    
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>Rs. {props.orderdetails.price}</label>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label>{props.orderdetails.quantity}</label>
                    </div>
                    
                </div>
            </div>
            <hr></hr>
        </div>
            
    )
}

export default Orderitemdetails;