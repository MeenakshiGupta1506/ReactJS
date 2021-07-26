import {Component} from "react" 
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}
class Login extends Component{
    constructor(){
        super()
        this.state={
            errors:null
        }
    }

login(event){
    event.preventDefault()
    let errors = {}
    this.setState({
        errors:null
    })
    
    var form = document.getElementById('signupform')
    if(!form["elements"]["namefield"].value){
        errors.name = "Username is required"
        form["elements"]["namefield"].style["border-color"]="red"
    }
    else
    {
        form["elements"]["namefield"].style["border-color"]="green"
    }
    if(!form["elements"]["emailfield"].value){
        errors.email = "Email is required"
        form["elements"]["emailfield"].style["border-color"]="red"
    }
    else if(!validateEmail(form["elements"]["emailfield"].value)){
       errors.email = "Invalid Email"
       form["elements"]["emailfield"].style["border-color"]="red"
    }
    else{
        form["elements"]["namefield"].style["border-color"]="green"
    }
    if(!form["elements"]["passwordfield"].value){
        errors.password = "Password is required"
        form["elements"]["passwordfield"].style["border-color"]="red"
    }
    else if(!validatePassword(form["elements"]["passwordfield"].value)){
        errors.password="Password should contain minimum 8 letters with at least a symbol, upper and lower case letters and a number"
        
        form["elements"]["passwordfield"].style["border-color"]="red"
     }
     else{
        form["elements"]["namefield"].style["border-color"]="green"
     }

     this.setState({
         errors:errors 
     })
     
     var user = {}
     if((errors.email==null && errors.password==null && errors.name==null)){
         user.name = form["elements"]["namefield"].value
         user.email = form["elements"]["emailfield"].value
         user.password = form["elements"]["passwordfield"].value
         axios({
             url : "https://apibyashu.herokuapp.com/api/register",
             method : "post",
             data : user
         }).then((response)=>{
             toast.success(response.data.message)
            console.log("response from signup api",response)
         },(error)=>{
            toast.error(error.data.message)
            console.log("error from signup api",error)
         })
     }
     console.log(user)
}
render(){
    return(
        <div className="container p-3" style={{marginTop:"30px",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60, 80, 220, 0.1)",boxShadow:"1px 1px 10px gray"}}>
        <div className="row justify-content-center">
            <div className="col-sm-7">

                <form id="signupform" >
                    <h3>Signup Form</h3><br></br>
                    <div class="form-group">
                        <input name="namefield" type="text" class="form-control" id="" placeholder="Enter Username"  />
                        <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.name}</label>
                        
                    </div><br></br>
                    <div class="form-group">
                        <input name="emailfield" type="email" class="form-control" id="" placeholder="Enter Email"  />
                        <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.email}</label>
                        
                    </div><br></br>
                    <div class="form-group">
                        <input name="passwordfield" type="password" class="form-control" id="" placeholder="Enter Password"  />
                        <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.password}</label>
                    </div>
                    <div class="form-group " style={{textAlign:"left"}}>
                        <button onClick={this.login.bind(this)} type="submit" class="btn btn-primary">SignUp</button>
                    </div>
                    <div class="form-group " style={{textAlign:"left"}}>
                        Already a User? Login <a href="/login">here</a>
                    </div>
                </form>
                <ToastContainer/>
            </div>
        </div>
    </div> 
    )
}
}

export default Login