import FA from "react-fontawesome";
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Orderitemdetails from "./Orderitemdetails"

function Orderitem(props) {

    return(
                
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#order"+props.order.orderid} aria-expanded="true" aria-controls={"order"+props.order.orderid}>
                    <strong>Order id #{props.order.orderid}</strong><strong style={{marginLeft:"30px"}}>Purchased on: {props.order.orderdate}</strong><strong style={{marginLeft:"30px"}}>Price: {props.order.price}</strong>
                    </button>
                    </h2>
                    <div id={"order"+props.order.orderid} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div>
                                <p><strong>Order by:</strong> {props.order.name}</p>
                                <p><strong>Address:</strong> {props.order.address}</p>
                                <p><strong>City:</strong> {props.order.city}</p>
                                <p><strong>Payment mode:</strong> {props.order.mode}</p>
                            </div>
                        {props.order.cakes.map(function(each){
                        return(
                        <Orderitemdetails orderdetails={each}></Orderitemdetails>
                        );
                    })}
                        </div>
                    </div>
                </div>
    )
}

export default Orderitem;