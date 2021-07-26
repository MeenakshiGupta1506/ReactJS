import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import {withRouter} from "react-router-dom"
import { connect } from 'react-redux';


function Navbar(props) {
  var projecttitle = "My Cakeshop";
  var logout = function(){
    localStorage.clear()
    window.location.href = "/"
  }
  var text
  function getText(event){
      text = event.target.value
  }

  function searchText(event){
      event.preventDefault()
      if(text && text.length){
        var url = "/search?q="+text
        props.history.push(url)
      }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{"background-color":"thistle"}}>
      <div className="container-fluid">
        <Link to="/" style={{ "text-decoration": "none" }}><a className="navbar-brand" id="projecttitle">{projecttitle}</a></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex">
          <input onChange={getText} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button onClick={searchText} className="btn btn-outline-success" type="submit"><FA name="search"></FA></button>
        </form>
        <ul className="nav justify-content-end">
          <li className="nav-item">
          
          {props.isloggedin &&<div><Link to="/order"><button className="btn btn-outline-primary" type="submit">My Orders</button></Link> <Link to="/cart"><button className="btn btn-outline-primary" type="submit">Cart</button></Link> <Link to="/cakeadd"><button className="btn btn-outline-primary" type="submit">AddCake</button></Link> <button className="btn btn-outline-danger" type="submit" onClick={logout}>Logout</button> </div>}
          {!props.isloggedin && <Link to="/login"><button className="btn btn-outline-primary" type="submit">Login</button></Link>}
          </li>
        </ul>
      </div>
    </nav>
  )
}

var Navbarcomp = withRouter(Navbar)
export default connect(function(state){
  return{
    isloggedin : state["isloggedin"]
  }
})(Navbarcomp)