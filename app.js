const express = require('express');
var path = require('path');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


//Extended True allows to Parse extended bodies with rich data
//False allows to Parse simple bodies for URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules/'));
// Connection URL
var url = 'mongodb://localhost:27017/myLocalDB';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function (err, database) {
  if (err) {
    console.log("Issue while connecting DB");
    throw err;
  }
  else {
    console.log("Connected successfully to server...");
    var db = database.db('myLocalDB');
    require('./api/routes')(app, db); //by default it go to for index.js file.
  }
});


app.use(morgan('dev')); //Added this line above all, so that it writes logs of api responses in Terminal


// app.use("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

//Routes for handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Handle erros if request is wrong or something else.
// app.use((req,res,next)=>{
//     const error=new Error('Not Found');
//     error.status=404;
//     next(error);
// });

// app.use((error,req,res,next)=>{
//     res.status(error.status||500);
//     res.json({
//         error:{
//             message:error.message
//         }
//     })
// });


module.exports = app;

