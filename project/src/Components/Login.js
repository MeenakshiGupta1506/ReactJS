import {Component} from "react" 
import axios from "axios"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, withRouter} from "react-router-dom"
import { connect } from "react-redux";

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
    
    var form = document.getElementById('loginform')
    if(!form["elements"]["emailfield"].value){
        errors.email = "Email Required"
        form["elements"]["emailfield"].style["border-color"]="red"
    }
    else if(!validateEmail(form["elements"]["emailfield"].value)){
       errors.email = "Invalid Email"
       form["elements"]["emailfield"].style["border-color"]="red"
    }
    if(!form["elements"]["passwordfield"].value){
        errors.password = "Password Required"
        form["elements"]["passwordfield"].style["border-color"]="red"
    }
    else if(!validatePassword(form["elements"]["passwordfield"].value)){
        errors.password="Password should contain minimum 8 letters with at least a symbol, upper and lower case letters and a number"
        
        form["elements"]["passwordfield"].style["border-color"]="red"
     }

     this.setState({
         errors:errors
     })
     var user = {}
     if((errors.email==null && errors.password==null)){
         user.email = form["elements"]["emailfield"].value
         user.password = form["elements"]["passwordfield"].value
         axios({
            url : "https://apibyashu.herokuapp.com/api/login",
            method : "post",
            data : user
        }).then((response)=>{
            toast.success(response.data.message)
           console.log("response from login api",response)
           if(response.data.token){
               localStorage.token = response.data.token
               localStorage.email = response.data.email
               localStorage.name = response.data.name
                this.props.history.push("/")
            //    this.props.inform_login()
               this.props.dispatch({
                   type:"LOGIN"
               })
               
           }
        },(error)=>{
            toast.error(error.data.message)
           console.log("error from login api",error)
        })
     }
     console.log(user)
}
render(){
    if(localStorage.token)
    {
        return(
            <Redirect to="/"></Redirect>
        )
    }
    else{
    return(
        <div className="container p-3" style={{marginTop:"30px",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60, 80, 220, 0.1)",boxShadow:"1px 1px 10px gray"}}>
        <div className="row justify-content-center">
            <div className="col-sm-7">

                <form id="loginform" >
                    <h3>Login Form</h3><br></br>

                    <div class="form-group">
                        <input name="emailfield" type="email" class="form-control" id="" placeholder="Enter Email"  />
                        <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.email}</label>
                        
                    </div><br></br>
                    <div class="form-group">
                        <input name="passwordfield" type="password" class="form-control" id="" placeholder="Enter Password"  />
                        <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.password}</label>
                    </div>
                    <a href="/forgotpassword">Forgot Password?</a>
                    <div class="form-group " style={{textAlign:"left"}}>
                        <button onClick={this.login.bind(this)} type="submit" class="btn btn-primary">Login</button>
                    </div>
                    <div class="form-group " style={{textAlign:"left"}}>
                        New User? <a href="/signup">SignUp Now</a>
                    </div>
                    
                </form>
            <ToastContainer/>
            </div>
        </div>
    </div> 
    )
    }
}
}
var Logcomp = withRouter(Login)
export default connect()(Logcomp)