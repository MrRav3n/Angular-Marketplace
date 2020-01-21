const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server started')
});
products = [
  {
    id: 1,
    title: 'New Iphone',
    description: 'Good phone with great camera',
    isPromoted: true,
    category: 'IT'
  },
  {
    id: 2,
    title: 'Samsung TV',
    description: 'Kinda good TV, BUY IT!',
    isPromoted: true,
    category: 'IT'
  },
  {
    id: 3,
    title: 'New Car',
    description: 'Just simple car',
    isPromoted: false,
    category: 'Car'
  },
  {
    id: 4,
    title: 'Big desk',
    description: 'Desk. You can plase here your plants or whatever',
    isPromoted: true,
    category: 'House'
  },
  {
    id: 5,
    title: 'Książka',
    description: 'Książka bardzo fajna',
    isPromoted: true,
    category: 'House'
  }
];

app.route('/api/products').get((req, res) => {
  res.send(products);
});

app.route('/api/products/:product').get((req, res) => {
  const id = req.params['product'];
  console.log(products[id-1]);
  res.send(products[id-1]);
});
