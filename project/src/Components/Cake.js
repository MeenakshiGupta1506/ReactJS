import { withRouter } from "react-router-dom";

function Cakelistitem(props){
    var showCake = function(){
        var url = "/showcake/"+props.cakedata.cakeid
        props.history.push(url)
    }
    if(props.cakedata)
    return(
        <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3"style={{marginTop:"5px"}}> 
        <div onClick={showCake} className="card" style={{width: "12rem",margin:"2px"}}>
        <img src={props.cakedata.image} className="card-img-top" alt="..." style={{height:"200px"}}></img>
        <div className="card-body">
          <h5 className="card-title">{props.cakedata.name}</h5>
          <p className="card-text">Rs. {props.cakedata.price}</p>
          {props.cakedata.discount && <p className="card-text">Discount : Rs. {props.cakedata.discount}</p>}
          
        </div>
      </div>
      </div>
    )
    else{
        return null;
    }
}

export default withRouter(Cakelistitem);