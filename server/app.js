// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('123')
// })

// const port = process.env.PORT || 3000
// app.listen(port)
// console.log(express)

const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const http = require('http');
const url = require('url');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3036;

app.listen(port);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'e_commerce'
});
  
// connection.connect(function(err) {
//  if (err) throw err;
//  else console.log('connected!')
// });

app.get('/signin', function (req, res) {
  connection.query('SELECT * FROM accounts', function (error, results) {
    if (error) throw error;
    console.log('success!!')
    res.send(results);
  });
});

app.get('/user/products', function(req, res) {
    connection.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
    res.send(results)
    });
  });

app.get('/admin/products', function(req, res) {
  connection.query('SELECT * FROM products', function (error, results) {
  if (error) throw error;
  res.send(results)
  });
});

app.post('/admin/products', function(req, res) {
  const value = req.body.data;
  console.log(value)
  const add = `INSERT INTO products (image, category, name, price, description) 
    VALUES ('${value.image}', '${value.category}', '${value.name}', ${value.price}, '${value.description}')`;
  
  connection.query(add, function(error, results) {
    if (error) throw error;
    res.end('{"success" : "true"}');
  })
})

app.put('/admin/products/:id', function(req, res) {
  const value = req.body.data;
  const productId = req.params.id;
  const update = `UPDATE products 
    SET image = ${value.image}, category = ${value.category}, name = ${value.name}, price = ${value.price}, description = ${value.description}
    WHERE ${productId} = id`;
    
  connection.query(update, function(error, results) {
    if (error) throw error;
    res.end('{"success" : "true"}');
  })
})

app.delete('/admin/products/:id', function(req, res) {
    const productId = req.params.id;
    console.log(productId)
    const drop = `DELETE FROM products WHERE ${productId} = id`;
    
    connection.query(drop, function(error, results) {
      if (error) throw error;
      res.end('{"success" : "true"}');
    })
  })
// app.get('/:role', function(req, res) {
//     const role = req.params.role;
//     console.log(role)
//     console.log('test')
//     res.send(role);
//   })

// connection.end();
module.exports = {
  products: this.products
};