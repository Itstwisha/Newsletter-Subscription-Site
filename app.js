
const mailchimp = require("@mailchimp/mailchimp_marketing");



const express = require("express");

const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "e8624ad56d2aee29949be97af8c56bae-us1",
  server: "us1",
});

app.post("/", function(req, res){
  
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

   const listId = "e0a9fa41a8";


   async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
    }
    });
    //If all goes well logging the contact's id
     res.sendFile(__dirname + "/success.html")
     console.log(
    `Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );
    }
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
     run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });
    
app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port 3000");
});