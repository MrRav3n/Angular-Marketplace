const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validators = require('validator');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://MrRav3n:DAW100kr@cluster0-6xfty.mongodb.net/test?retryWrites=true&w=majority";
const await = require('await');
const client = new MongoClient(uri, { useNewUrlParser: true });
let collectionProducts;
let collectionUsers;
let collectionCategories;
client.connect(err => {
  collectionProducts = client.db("Shop").collection("products");
  collectionUsers = client.db("Shop").collection("users");
  collectionCategories = client.db("Shop").collection("categories");

});

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
let id;
app.use(bodyParser.json());
app.route('/api/products').get(async (req, res) => {
  let response = [];
  collectionProducts.find().toArray().then(items => {
    items.forEach(item => {
      response.push(item);
    });
    res.send(response);
  });
});
app.route('/api/products/:product').get((req, res) => {
  const id = +req.params['product'];
  collectionProducts.findOne({id: id}).then( item => {
    res.send(item);
  });

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
    console.log(email);
    collectionUsers.findOne({email: email}).then(item => {
      console.log(item);
      if(item) {
        res.send({message : 'Cannot register new user, user is already in the database'});
        return;
      }
    }).then(e => {
      collectionUsers.insertOne({email: email, password: password, ownedProducts: [], money: 200});
      res.send({message :'New user registered'});
    });

  }
});
app.route('/api/user/login').post(async (req, res) => {
  let email = req.body['email'];
  let password = req.body['password'];
  databaseCheckUser({email: email, password: password}).then(result => res.send(result));
});
app.route('/api/user/getProducts/:email').get((req, res) => {
  const email = req.params['email'];
  collectionUsers.findOne({email: email}).then(user => {
    res.send(user.ownedProducts);
  })
});
function databaseCheckUser(user) {
  return collectionUsers.findOne({email: user.email, password: user.password})

}


function databaseCheckUserI(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
      return i;
    }
  }
}
function databaseCheckProduct(product) {
  return collectionProducts.findOne({id: product.id})
}
app.route('/api/products/newproduct/add').post((req, res) => {
  let product = req.body;
  if(product[0]['check']) {
    databaseCheckUser(product[1]).then(user => {
      if(user.money < 5) {
        res.send({message :'Can`t promote new product'});
        return;
      } else {
        collectionUsers.updateOne({email: user.email}, {$set: {money: user.money-5}})
      }
    });
  }

  if(product[1]) {
    if(databaseCheckUser(product[1])) {
      collectionProducts.find({}, { sort: { _id: -1 }, limit: 1 }).toArray().then(e => {
      collectionProducts.insertOne({
        id: e[0].id+1,
        title: product[0]['name'],
        description: product[0]['description'],
        isPromoted: product[0]['check'],
        category: product[0]['category'],
        price: product[0]['price'],
        owner: product[1].email
      });
        res.send({message :'Product added'});
    });
    }
  }

});
async function lastItem()  {
  return await collectionProducts.find().limit(1).sort({$natural:-1});
}
app.route('/api/user/addMoney').post((req, res) => {
  let email = req.body['email'];
  collectionUsers.findOne({email: email}).then(item => {
    collectionUsers.updateOne({email: email}, {$set: {
        money: item.money+=500
      }})
  })
});
app.route('/api/products/product/buy').post((req, res) => {
  let product = req.body;
  let productId;
  let userId;
  if(!product[1]) {
    res.send({message :'Can`t buy new product'});
    return;
  }
  databaseCheckProduct(product[0]).then(item => {
    productId = item;
  }).then(e => {
    collectionUsers.findOne({email: product[1].email}).then(item => {
      userId = item;
    }).then( e => {
      if (productId.price > userId.money || productId.bought === true) {
        res.send({message :'Can`t buy new product'});
        return;
      }
      collectionProducts.updateOne({id: productId.id}, {$set: {owner: product[1].email, bought: true}});
      collectionUsers.updateOne({email: userId.email}, {$set: {money: userId.money-product[0].price}});
      collectionUsers.findOne({email: productId.owner}).then( item => {
        collectionUsers.updateOne({email: item.email}, {$set: {money: item.money+productId.price}});
      });
      collectionUsers.updateOne({email: userId.email}, {$push: {ownedProducts: productId}});
      res.send({message :'Bought new product'});
    });
  });
});
app.route('/api/categories').get((req, res) => {
  collectionCategories.find().toArray().then(items => {
    res.send(items);
  })
});
app.route('/api/products/product/buy/all').post((req, res) => {
  let product = req.body;
  let productId = [];
  let productsWalue = [];
  let productsPrice = 0;

  for(let i=0; i < product[0].length; i++) {
    databaseCheckProduct(product[0][i]).then(item => {
      productId.push(item);
    });
    productsPrice += product[0][i].price;
    if(product[0][i].bought) {
      res.send({message :'Can`t buy all products'});
      return;
    }
  }
  let userId;
  databaseCheckUser(product[1]).then(user => {
    userId = user;
  }).then(e => {
    if (productsPrice > userId.money) {
      res.send({message :'Can`t buy all products'});
      return;
    }
    collectionUsers.updateOne({email: userId.email}, {$set: {money: userId.money-productsPrice}});
  }).then(async e => {
    for(let i=0; i < product[0].length; i++) {
      await collectionUsers.findOne({email: productId[i].owner}).then(async item => {
        await collectionUsers.updateOne({email: item.email}, {$set: {money: item.money+productId[i].price}});
      });
    }
    for(let i=0; i < product[0].length; i++) {
      collectionUsers.updateOne({email: userId.email}, {$push: {ownedProducts: productId}});
      collectionProducts.updateOne({id: productId[i].id}, {$set: {owner: userId.email, bought: false}});
    }
    res.send({message :'Bought all products'});
  });


});
