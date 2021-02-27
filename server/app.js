const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const http = require('http');
const url = require('url');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

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
    console.log('success')
    res.send(results)
    });
  });

app.post('/user/products', function(req, res) {
  const value = req.body.data;
  console.log(value)
  const add = `INSERT INTO cart (image, category, name, quantity, price) 
    VALUES ('${value.image}', '${value.category}', '${value.name}', '${value.quantity}', ${value.price})`;
    
  connection.query(add, function(error, results) {
    if (error) throw error;
    res.end('{"success" : "true"}');
  })
})

app.get('/user/cart', function(req, res) {
  connection.query('SELECT * FROM cart', function (error, results) {
  if (error) throw error;
  console.log('success')
  res.send(results)
  });
});

app.put('/user/cart/:id', function(req, res) {
  const value = req.body.data;
  const productId = req.params.id;
  const update = `UPDATE cart 
    SET quantity = ${value.quantity}
    WHERE ${productId} = id`;
    
  connection.query(update, function(error, results) {
    if (error) throw error;
    res.end('{"success" : "true"}');
  })
})

app.delete('/user/cart/:id', function(req, res) {
  const productId = req.params.id;
  console.log(productId)
  const drop = `DELETE FROM cart WHERE ${productId} = id`;
  
  connection.query(drop, function(error, results) {
    if (error) throw error;
    res.end('{"success" : "true"}');
  })
})

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
    SET image = '${value.image}', category = '${value.category}', name = '${value.name}', price = ${value.price}, description = '${value.description}'
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

module.exports = {
  products: this.products
};