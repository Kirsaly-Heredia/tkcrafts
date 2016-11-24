var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/', function (req, res) {
  res.render('home', {layouts: 'main'});
});

router.post('/product', function (req, res, next) {
  
  var product = new Product({
    category: {
      main: req.body.main ,
      sub: req.body.sub
    },
    product: {
      name: req.body.name,
      price: req.body.price,
      color: req.body.color,
      size: req.body.size,
      qty: req.body.qty,
      code: req.body.code
    },
    description: {
      details: req.body.deatils,
      content_care: {
        material: req.body.material, 
        wash: req.body.wash,
        dry: req.body.dry
      },
      size: {
        circumfrence: req.body.sircumfrence,
        width: req.body.width,
        length: req.body.length
      }
    }
  });

  product.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500);
      return res.render('500', {layout: 'main'});
    }
    
    return res.json({
      status: 'ok',
      message: 'created new product',
      product: data
    });
      
  });

});

router.get('/product', function (req, res, next) {
  Product.find({}, function (err, data) {
    if (err) {
      res.status(500);
      return res.render('500', {layout: 'main'});
    }
    
    return res.json(data);
  });
});

module.exports = router;