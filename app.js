const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const request = require("request")
const PORT = 3000;

// const client = require("@mailchimp/mailchimp_marketing");
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.post("/", function (req, res) {
    const first_name = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email


    const data = {
        members: [

            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: lastName
                }


            }
        ]
    }


var jsonData = JSON.stringify(data)
const url = "https://us1.api.mailchimp.com/3.0/lists/149c986b1fa"
const option = {
    method: "POST",
    auth:"sunil:3d740cbf7e6030c0e86177e832b37d4e-us1"
}


const request = https.request(url,option,function(response){
    console.log(response.statusCode)

    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html")
    }else {
        res.sendFile(__dirname + "/failure.html")
    }

    response.on("data",function(data){
     console.log(JSON.parse(data));   
    })
})

request.write(jsonData)
request.end()




})



app.get("/", function (req,res) {
    res.sendFile(__dirname + "/signup.html")
})





app.listen(PORT, function () {
    console.log("server started on port no 3000")
})





// 7c70fbefe139ef4f34e095bd68f2ee33-us1
// 149c986b1f