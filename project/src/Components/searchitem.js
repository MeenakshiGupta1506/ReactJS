import FA from "react-fontawesome"
import { withRouter } from "react-router-dom";

function Searchcakeitem(props) {
    var showCake = function(){
        var url = "/showcake/"+props.searchcakedata.cakeid
        props.history.push(url)
    }
    return (
        <div className="container">
            <div className="card mb-3">
                <div className="row">
                    <div className="col-4">
                        <img src={props.searchcakedata.image} alt="..." style={{ width: "300px", height: "250px" }}></img>
                    </div>
                    <div className="col-4">
                        <div className="card-body">

                            <h5 className="card-title">{props.searchcakedata.name}</h5>
                            <p className="card-text">{props.searchcakedata.description}</p>
                            <p>{props.searchcakedata.eggless && <div><FA style={{"color":"green"}} name="circle"></FA>  <label>Eggless</label></div>}
                            {!props.searchcakedata.eggless && <div><FA style={{"color":"red"}} name="circle"></FA>  <label>Contain Egg</label></div>}
                            </p>
                        </div>
                    </div>
                    <div className="col-2" style={{ "margin-top": "20px" }}>
                        <label><h4>Rs. {props.searchcakedata.price}</h4></label>
                    </div>
                    <div className="col-2" style={{ "margin-top": "20px" }}>
                        <button type="button" class="btn btn-primary" onClick={showCake}>Show Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Searchcakeitem);