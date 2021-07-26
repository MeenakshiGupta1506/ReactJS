import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom"
import './App.css';
import Home from "./Components/Home"
import Cakedetails from "./Components/Cakedetails"
import Navbar from "./Components/navbar"
import Login from "./Components/Login"
import Signup from "./Components/signup"
import {Component} from "react"
import ForgotPassword from "./Components/ForgotPassword"
import Search from "./Components/Search"
import Cart from "./Components/Cart"
import { ToastContainer } from "react-toastify";
import Cakeadd from "./Components/Cakeadd"
import Checkout from "./Components/Checkout"
import Error from "./Components/Error"
import Order from "./Components/Order"
import OrderSuccess from "./Components/OrderSuccess";
class App extends Component {
  constructor(){
      super()
      if(localStorage.token){
          this.state = {
              isloggedin:true
          }
      }
      else{
          this.state = {
              isloggedin:false
          }
      }
  }

  loginDone = ()=>{
      this.setState({
          isloggedin:true
      })
  }

  render(){
      return(
          <div style={{backgroundColor:"#fde2ee"}} >
              <ToastContainer/>
              <Router>
                  <Navbar></Navbar>
                  <Switch>
                      <Route exact path="/" component={Home}></Route>
                      <Route exact path="/showcake/:cakeid" component={Cakedetails}></Route>
                      
                      <Route exact path="/signup" component={Signup}></Route>
                      <Route exact path="/login"><Login ></Login></Route>
                      <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
                      <Route exact path="/search" component={Search}></Route>
                      <Route exact path="/cart" component={Cart}></Route>
                      <Route exact path="/cakeadd" component={Cakeadd}></Route>
                      <Route exact path="/checkout" component={Checkout}></Route>
                      <Route exact path="/order" component={Order}></Route>
                      <Route exact path="/ordersuccess" component={OrderSuccess}></Route>
                      <Route exact path="/*" component={Error}></Route>
                  </Switch>
              </Router>
          </div>
      )
  }
}




export default App;
