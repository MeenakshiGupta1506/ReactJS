import Cakelistitem from "./Cake" 
import axios from "axios"
import {useState} from "react"
import data from "./data.js";

function Cakelist(){
    var [cakes,setCakes] = useState(data.cakes)
    if(!cakes.length>0){
    axios({
        url : "https://apibyashu.herokuapp.com/api/allcakes",
        method : "get"
    }).then((response)=>{
        data.cakes = response.data.data
        setCakes(response.data.data)
        
    },(error)=>{
        console.log("error from add cake api",error)
    })
    }
    return(
        <div className="container">
        <div className="row">
          { cakes && cakes.length>0 && cakes.map(function (each) {
            if(each.name !== "Vidit Sethi")
            {
              
            
            return (
              <Cakelistitem cakedata={each}></Cakelistitem>
            )}
          })}
        </div>
      </div>
      )
}


export default Cakelist
