const express = require('express');
var app = express();
var fs = require("fs");
var directory = './jsonData/customers.json';   //JSON file to be used
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

Object.prototype.removeItem = function(key) {
  if (!this.hasOwnProperty(key))
    return
  if (isNaN(parseInt(key)) || !(this instanceof Array))
    delete this[key]
  else
    this.splice(key, 1)
};

let readFromJSON = new Promise(
  function(resolve, reject) {
    let userData;
    fs.readFile(directory, 'utf8', function(err, data) {
      userData = JSON.parse(data);
      if (userData)
        resolve(userData);
      else
        reject(new Error('unable to fetch data'));
    });

  }
);

let writeToJSON = function(dataToAdd) {
  let writeJSON = new Promise(
    function(resolve, reject) {
      let userData;
      fs.writeFile(directory, dataToAdd, function(err) {
        if (err)
        reject(new Error('unable to write data'));
        else
        resolve("successully written");
      });

    }
  );
  return writeJSON;
}


app.get('/listCustomers', function(req, res) {
  readFromJSON.then(function(data) {
      res.json({
        success: true,
        data: {
          msg: 'Customers List !',
          data: data
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
})

app.post('/listCustomers/add', function(req, res) {
  if (!req.body) {
    res.json({
      success: false,
      data: 'Please add customer details.'
    });
  } else {
    readFromJSON.then(function(data) {
          data.push(req.body);
          let wrotePromise = writeToJSON(JSON.stringify(data, null, 2));
          wrotePromise.then(function(data) {
            res.json({
              success: true,
              message : "data successfully added!"
            });
          })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

})

app.post('/listCustomers/delete/:id', function(req, res) {
  // First read existing users.
  console.log("delete Users");
  let id = req.params.id;
  if(id ) {
    readFromJSON.then(function(data) {
        data.removeItem(id);
          let wrotePromise = writeToJSON(JSON.stringify(data, null, 2));
          wrotePromise.then(function() {
            res.json({
              success: true,
              message : "data successfully deleted!"
            });
          })
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    res.json({
      success: false
    });
  }
})

app.get('/listCustomers/details/:id', function (req, res) {
   // First read existing users.
   let id = req.params.id;
   if(id ) {
     readFromJSON.then(function(data) {
         console.log("server hit!")
         res.json({
           success: true,
           data: {
             msg: 'Customer Details!',
             data: data.filter((val)=> val.customerID == id)[0]
           }
         });
       })
       .catch(function(error) {
         console.log(error);
       });
   } else {
     res.json({
       success: false
     });
   }

})

app.post('/listCustomers/update/:id', function (req, res) {
   // First read existing users.
   let id = req.params.id;
   if(id ) {
     readFromJSON.then(function(data) {
         console.log("updating!")
           data.forEach((val,key)=> {
              if(val.customerID == id) {
                  data[key] = req.body;
              }
           });
           let wrotePromise = writeToJSON(JSON.stringify(data, null, 2));
           wrotePromise.then(function() {
             res.json({
               success: true,
               message : "data successfully saved!"
             });
           })
       })
       .catch(function(error) {
         console.log(error);
       });
   } else {
     res.json({
       success: false
     });
   }

})

// E.G Server URL http://localhost:7007/listCustomers

const server = app.listen(7007, function() {
  let host = server.address().address,
    port = server.address().port

  console.log("Example app listening at", host, port)
})
