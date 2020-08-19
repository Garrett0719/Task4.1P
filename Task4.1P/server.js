const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const mongoose = require("mongoose")
const validator = require("validator")
const alert = require("alert")
const Registration = require("./registration.js")

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

mongoose.connect("mongodb://localhost:27017/iCrowdTaskDB",{useNewUrlParser:true, useUnifiedTopology:true})

app.post('/',(req,res)=>{
    const country = req.body.country
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const password = req.body.password
    const confirm = req.body.confirmpassword
    const address = req.body.address
    const address2 = req.body.address2
    const city = req.body.city
    const state = req.body.region
    const zip = req.body.zip
    const tel = req.body.phone
    module.exports.confirm = confirm;
    const registration = new Registration({
        livecountry:country,
        fname: firstname,
        lname: lastname,
        Email: email,
        Password: password,
        Address:address,
        Address2:address2,
        City:city,
        State:state,
        Zip:zip,
        Phonenumber:tel
    })

    registration.save(function(error){
        if(error){
             if(validator.isEmpty(firstname)){
                alert("Please input first name")
            }
            else if(validator.isEmpty(country)){
                alert("Please choose a country")
            }
            else if(validator.isEmpty(lastname)){
                alert("Please input last name")
            }
            else if(validator.isEmpty(email)){
                alert('Please input email address!')
            }
            else if(!validator.isEmail(email)){
                alert("Email is not valid!")
            }
            else if(!validator.isLength(password,{min:8})){
                alert('password should be at least 8 characters!')
            }
            else if(validator.isEmpty(password)){
                alert('Please input password!')
            }
            else if(!validator.equals(confirm, password)){
                alert('Password does not match with Confirm password!')
            }
            else if(validator.isEmpty(address)){
                alert('Please input address!')
            }
            else if(validator.isEmpty(city)){
                alert('Please input city!')
            }
            else if(validator.isEmpty(state)){
                alert('Please input state!')
            }
            else if((!validator.equals(tel,""))&&(!validator.isMobilePhone(tel))){
                alert('Phone number is not valid!')
            }
        }
        else{
            if(res.statusCode === 200){
            res.sendFile(__dirname + "/successful.html")
            }
            else 
        {
            res.sendFile(__dirname + "/fail.html")
        }
        }
})
})

app.listen(8000,(req,res)=>{
    console.log("Server is running on port 8000")
})

