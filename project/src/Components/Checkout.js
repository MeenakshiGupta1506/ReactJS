import queryParser from "query-string"
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Checkout(props){
    var query = queryParser.parse(props.location.search)
    var result = JSON.parse(query.cakes)
    console.log("Result",result)
    var errors={}
    function Order(event){
        event.preventDefault()
        
        var form = document.getElementById('orderform')

        axios({
            url: "https://apibyashu.herokuapp.com/api/addcakeorder",
            method: "POST",
            data: {
                address: form["elements"]["address"].value,
                city: form["elements"]["city"].value,
                phone: form["elements"]["mobile"].value,
                pincode: form["elements"]["pincode"].value,
                name: form["elements"]["name"].value,
                cakes: result,
                email: localStorage.email,
                price: query.price,

            },
            headers: {
                authtoken: localStorage.token
            }
        }).then((response)=>{
            toast.success(response.data.message)
            props.history.push("/ordersuccess?id="+response.data.order.orderid)
            console.log("response from addcake api",response.data)
        },(error)=>{
            console.log("error in addcake api",error)
        })


      }
    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <form id="orderform">
                <div className="row mb-3">
                    <label for="" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id=""  name="name"></input>
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="" className="col-sm-2 col-form-label" >Mobile No.</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id=""  name="mobile"></input>
                       
                    </div>
                </div>
        
                <div className="row mb-3">
                    <label for="" className="col-sm-2 col-form-label" >Address</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id=""  name="address"></input>
                       
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="" className="col-sm-2 col-form-label">City</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id=""  name="city"></input>

                    </div>
                </div>
                <div className="row mb-3">
                    <label for="" className="col-sm-2 col-form-label">Pincode</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id=""  name="pincode"></input>
                     
                    </div>
                </div>
               
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled></input>
                    <label class="form-check-label" for="flexCheckCheckedDisabled">
                    Cash on delivery
                    </label>
                </div>
                <center><button type="submit" className="btn btn-success" onClick={Order}>Order Now</button></center>
            </form>
            
        </div>
    )
}

export default Checkout