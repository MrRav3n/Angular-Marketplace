const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.listen(3000, () => {
  console.log('Server started')
});
products = [
  {
    id: 1,
    title: 'New Iphone',
    description: 'Good phone with great camera',
    isPromoted: true,
    category: 'IT',
    price: 2999,
    owner: 'adam123@wp.pl'
  },
  {
    id: 2,
    title: 'Samsung TV',
    description: 'Kinda good TV, BUY IT!',
    isPromoted: true,
    category: 'IT',
    price: 1500,
    owner: 'Zbyczek2115@wp.pl'
  },
  {
    id: 3,
    title: 'New Car',
    description: 'Just simple car',
    isPromoted: false,
    category: 'Car',
    price: 20000,
    owner: 'Czarny@wp.pl'
  },
  {
    id: 4,
    title: 'Big desk',
    description: 'Desk. You can plase here your plants or whatever',
    isPromoted: true,
    category: 'House',
    price: 130,
    owner: 'Joanna@gmail.com'
  },
  {
    id: 5,
    title: 'Książka',
    description: 'Książka bardzo fajna',
    isPromoted: true,
    category: 'House',
    price: 99,
    owner: 'Właściciel@02.pl'
  }
];
users = [{
  email: '123@wp.pl',
  password: '123'

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
    for(let i=0; i<users.length; i++) {
      if(users[i].email === email) {
        return;
      }
    }
    users.push({email: email, password: password});
  }
});
app.route('/api/user/login').post((req, res) => {
  let email = req.body['email'];
  let password = req.body['password'];
  let user = databaseCheck({email: email, password: password});
  res.send(user);
});
function databaseCheck(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
      return users[i];
    }
  }
}
app.route('/api/products/newproduct/add').post((req, res) => {
  let product = req.body;
  if(databaseCheck(product[1])) {
    products.push({id: products.length+1, title: product[0]['name'], description: product[0]['description'], isPromoted: product[0]['check'], category: product[0]['category'], price: product[0]['price'], owner: product[1].email})
  }
});
