import queryparser from "query-string"
import axios from "axios"
import {useState,useEffect} from "react"
import Searchcakeitem from "./searchitem"
import {Redirect} from "react-router-dom"
 
function Search(props) {
    var query = queryparser.parse(props.location.search)

    console.log("Result",query)

    var searchtext = query.q

    var [cakesresult,setCakesresult] = useState([])

    
    useEffect(function(){
        var apiurl = "https://apibyashu.herokuapp.com/api/searchcakes?q="+searchtext
        axios({
            method : "get",
            url : apiurl
        }).then((response)=>{
            setCakesresult(response.data.data)
        },(error)=>{
            console.log("error from searchcakes api",error)
        })
    },[searchtext])
    
    return(
        <div>
            {!cakesresult.length>0 && <div className="alert alert-warning"><h1>Oops! No cakes found for your search</h1></div>}
            {cakesresult.length>0 && <div>{cakesresult.map((each)=>{
                return <Searchcakeitem searchcakedata={each}></Searchcakeitem>
            })}</div>}
        </div>
    )
}

export default Search