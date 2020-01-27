const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validators = require('validator');
app.listen(3000, () => {
  console.log('Server started')
});
categories = [
  {
    title: 'IT',
  },
  {
    title: 'House',
  },
  {
    title: 'Car',
  },
];
products = [
  {
    id: 1,
    title: 'New Iphone',
    description: 'Good phone with great camera',
    isPromoted: true,
    category: 'IT',
    price: 2999,
    owner: 'adam123@wp.pl',
    bought: false,
  },
  {
    id: 2,
    title: 'Samsung TV',
    description: 'Kinda good TV, BUY IT!',
    isPromoted: true,
    category: 'IT',
    price: 1500,
    owner: 'Zbyczek2115@wp.pl',
    bought: false,
  },
  {
    id: 3,
    title: 'New Car',
    description: 'Just simple car',
    isPromoted: false,
    category: 'Car',
    price: 20000,
    owner: 'Czarny@wp.pl',
    bought: false,
  },
  {
    id: 4,
    title: 'Big desk',
    description: 'Desk. You can plase here your plants or whatever',
    isPromoted: true,
    category: 'House',
    price: 130,
    owner: 'Joanna@gmail.com',
    bought: false,
  },
  {
    id: 5,
    title: 'Book',
    description: 'Cool book',
    isPromoted: true,
    category: 'House',
    price: 99,
    owner: 'Właściciel@02.pl',
    bought: false,
  }
];
users = [{
  email: '123@wp.pl',
  password: '123',
  ownedProducts: [],
  money: 100,
}];
app.use(bodyParser.json());
app.route('/api/products').get((req, res) => {
  res.send(products);
});
app.route('/api/products/:product').get((req, res) => {
  const id = req.params['product'];
  res.send(products[id-1]);
});
app.route('/api/user/add').post((req, res) => {
  if(req.body['check']) {
    let email = req.body['email'];
    let password = req.body['password'];
    let emailCheck = validators.isEmail(email);
    let passwordCheck = validators.isLength(password, 3);
    if (!emailCheck || !passwordCheck) {
      res.send({message :'Cannot register new user, check your email and password'});
      return;
    }
    for(let i=0; i<users.length; i++) {
      if(users[i].email === email) {
        res.send({message : 'Cannot register new user, user is already in the database'});
        return;
      }
    }
    users.push({email: email, password: password, ownedProducts: [], money: 200});
    res.send({message :'New user registered'});
  }
});
app.route('/api/user/login').post((req, res) => {
  let email = req.body['email'];
  let password = req.body['password'];
  let user = databaseCheckUser({email: email, password: password});
  res.send(user);
});
app.route('/api/user/getProducts/:email').get((req, res) => {
  const email = req.params['email'];
  let id;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      id = i;
    }
  }
  res.send(users[id].ownedProducts);
});
function databaseCheckUser(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
      return users[i];
    }
  }
}
function databaseCheckUserI(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
      return i;
    }
  }
}
function databaseCheckProduct(product) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === product.id) {
      return i;
    }
  }
}
app.route('/api/products/newproduct/add').post((req, res) => {
  let product = req.body;
  if(product[0]['check']) {
    let userId = databaseCheckUserI(product[1]);
    if(users[userId].money<5) {
      return;
    }
    users[userId].money -= 5;

  }
  if(product[1]) {
    if(databaseCheckUser(product[1])) {
      products.push({id: products.length+1, title: product[0]['name'], description: product[0]['description'], isPromoted: product[0]['check'], category: product[0]['category'], price: product[0]['price'], owner: product[1].email})
      res.send({message :'Product added'});
    }
  }

  res.end({message :'Cannot add new product'});
});
app.route('/api/user/addMoney').post((req, res) => {
  let email = req.body['email'];
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      users[i].money += 500;
      return;
    }
  }
});
app.route('/api/products/product/buy').post((req, res) => {
  let product = req.body;
  let productId = databaseCheckProduct(product[0]);
  let userId = databaseCheckUserI(product[1]);
  if (products[productId].price > users[userId].money || products[productId].bought === true) {
    res.send({message :'Can`t buy new product'});
    return;
  }

  products[productId].owner = product[1].email;
  products[productId].bought = true;
  users[userId].money -= product[0].price;
  users[userId].ownedProducts.push(products[productId]);
  res.send({message :'Bought new product'});
});
app.route('/api/categories').get((req, res) => {
  res.send(categories);
});
app.route('/api/products/product/buy/all').post((req, res) => {
  let product = req.body;
  let productId = [];
  let productsPrice = 0;

  for(let i=0; i < product[0].length; i++) {
    productId.push(databaseCheckProduct(product[0][i]));
    productsPrice += product[0][i].price;
    if(product[0][i].bought) {
      res.send({message :'Can`t buy all products'});
      return;
    }
  }

  let userId = databaseCheckUserI(product[1]);
  if (productsPrice > users[userId].money) {
    res.send({message :'Can`t buy all products'});
    return;
  }
  for(let i=0; i < product[0].length; i++) {
    products[productId[i]].owner = product[1].email;
    products[productId[i]].bought = true;
    users[userId].money -= product[0][i].price;
    users[userId].ownedProducts.push(products[productId[i]]);
  }
  res.send({message :'Bought all products'});
});
