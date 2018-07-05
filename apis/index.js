const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
const router = express.Router();
// Connect to mongoDB database
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
 firstName: String,
 lastNameName: String
});

var User = mongoose.model("User", nameSchema);
// Routing
// Configure port
const port = 8181;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (request, response) => {

    response.status(200).send({message: 'Hello World!'})
});
router.get('/getdata', (request, response) => {
    User.find(function (err, adminLogins) {
        if (err) return console.error(err);

        response.status(200).send(adminLogins)
        console.log(adminLogins);
    });
  
});

function getUser(){
   return User.find(function (err, adminLogins) {
       

        return adminLogins;
    });
}


app.post("/addname", (req, res) => {
    console.log(req.body);
 var myData = new User({"firstName":"freddy","lastNameName":"alfred"});
 myData.save()
 .then(getUser)
 .then(item => {
    // console.log(item);
 res.send(item);
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});
//Set app to use express backend router
app.use(router);