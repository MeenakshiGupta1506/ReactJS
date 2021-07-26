import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import {Redirect, withRouter} from "react-router-dom"



class Addcakes extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            errors: null,
        }
    }
    handleChange = (event) =>  {
        var formdata = new FormData()
        formdata.append("file",event.target.files[0])
        axios({
             url : "https://apibyashu.herokuapp.com/api/upload",
             method : "post",
             data : formdata,
            headers:{
                authtoken:localStorage.token
             }
         }).then((response)=>{
              if(response.data.imageUrl){
                 console.log(response.data.imageUrl)
                  this.setState({
                      image: response.data.imageUrl
                    })
             }
            console.log("response from upload api",response)
        },(error)=>{
            console.log("error from upload api",error)
         })
    }
    
    
    
      formValidate = (event) =>{
          event.preventDefault()
          var errors ={}
          var  form = document.getElementById('cakelist')
        
          if(!form["elements"]["name"].value){
              errors.name = "cake name is requried"
    
          }else if(form["elements"]["name"].value < 3){
              errors.name = "name should be greater then 3"
              
          }
    
          if(!form["elements"]["description"].value){
              errors.description ="please enter dicription "
          }else if(form["elements"]["description"].value < 20){
            errors.description ="description lenght should be min 20 words"
          }
    
          if(!form["elements"]["ingredients"].value){
            errors.ingredients ="please enter your ingridients "
           }
    
           if(!form["elements"]["price"].value){
            errors.price ="please enter price "
        }else if(form["elements"]["price"].value < 0){
          errors.price ="please enter valid price"
        }
        if(!form["elements"]["weight"].value){
            errors.weight ="please enter weight "
        }else if(form["elements"]["weight"].value < 0 ||form["elements"]["weight"].value > 5){
          errors.weight ="please enter valid weight"
        }
    
        if(!form["elements"]["flavour"].value){
            errors.flavour ="please enter flavour"
        }
    
    
          this.setState({
              errors:errors
          })
    
          var errorfields = Object.keys(errors);
          if(errorfields.length <= 0){
              var cake ={}
              for(var i=0 ; i<form.elements.length ; i++){
                  cake[form.elements[i].name] = form.elements[i].value
              }
              
              cake.eggless = form.elements.eggless.checked
              cake.ingredients = cake.ingredients.split(',')
              cake.image = this.state.image
              axios({
                url : "https://apibyashu.herokuapp.com/api/addcake",
                method : "post",
                 data : cake,
                headers:{
                    authtoken:localStorage.token
                 }
            }).then((response)=>{
                toast.success("cake details has added")
               console.log("response from addcake api",response)
           },(error)=>{
               toast.error("There is some error in enter cake details")
               console.log("error from addcake api",error)
            })
              console.log(cake)
          }
          else{
              toast.error("there is error in form")
          }
    
      }
    render() {
        if(!localStorage.token)
      {
          return(
              <Redirect to="/"></Redirect>
          )
      }
      else{
        return (
            <div className="container" style={{ marginTop: "20px" }}>
                <form id="cakelist">
                    <div className="row mb-3">
                        <label for="" className="col-sm-2 col-form-label">Cake Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="" onChange={this.getname} name="name"></input>
                            <label style={{ color: "red" }} class="form-text">{this.state.errors && this.state.errors.cakename}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="" className="col-sm-2 col-form-label" >Price</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="" onChange={this.getprice} name="price"></input>
                            <label style={{ color: "red" }} class="form-text">{this.state.errors && this.state.errors.price}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="" className="col-sm-2 col-form-label" >Flavour</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="" onChange={this.getflavour} name="flavour"></input>
                            <label style={{ color: "red" }} class="form-text">{this.state.errors && this.state.errors.flavour}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" id="" onChange={this.handleChange} name="image"></input>
                            <img src={this.state.image} style={{ "height": "80px", "width": "80px" }}></img>
                           
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="" className="col-sm-2 col-form-label">Weight</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="" onChange={this.getweight} name="weight"></input>
                            <label style={{ color: "red" }} class="form-text">{this.state.errors && this.state.errors.weight}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="" className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-1">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onChange={this.geteggless} name="eggless"></input>
                            <label class="form-check-label" for="flexCheckChecked">
                                Eggless
                </label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Select cake type</label>
                        <div className="col-sm-4">
                            <select class="form-select" aria-label="Default select example" onChange={this.gettype} name="type">
                                <option selected>Select cake type</option>
                                <option value="Birthday Cake">Birthday Cake</option>
                                <option value="Anniversary Cake">Anniversary Cake</option>
                                <option value="Photo Cake">Photo Cake</option>
                                <option value="Designer Cake">Designer Cake</option>
                            </select>
                            
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-3">
                            <textarea rows="4" cols="100" onChange={this.getdescription} name="description"></textarea>
                            <label style={{ color: "red" }} class="form-text">{this.state.errors && this.state.errors.description}</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Ingredients</label>
                        <div className="col-sm-3">
                            <textarea rows="4" cols="100" onChange={this.getingredients} name="ingredients"></textarea>
                            <label style={{ color: "red" }} class="form-text">{this.state.errors && this.state.errors.ingredients}</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.formValidate}>Add Cake</button>
                </form>
                <ToastContainer/>
            </div>
        )}
    }
}





export default Addcakes;

