import queryParser from "query-string"


function Success(props) {
    var query = queryParser.parse(props.location.search)
    return (
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Your Order has successfully placed</h5>
                <p class="card-text"><strong>Orderid : {query.id}</strong></p>
                <a href="/" class="btn btn-primary">Go to Home page</a>
            </div>
        </div>
    )
}
export default Success