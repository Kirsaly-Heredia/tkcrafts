//  products routes
var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});

var Product = require('../models/product');

router.get('/add', function (req, res) {
  res.render('add');
});

router.post('/add', upload.single('image'), function (req, res) {
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
      return res.render('505', {layout: 'main'});
    }
    
    return res.render('/');
    
//    return res.render('submitted', {layout: 'plain_views'});
  });
});

router.get('/browse', function (req, res) {
  var query = {};
  if (req.query.name) {
    query = {name: req.query.name};
  }
  Product.find(query, function (err, data) {
    var pageData = {
      products: data
    };
    res.render('browse', pageData);
  });

});

//router.get('/:category', function(req, res) {
//  Place.find({category: req.params.category}, function(err, data){
//    var pageData = [data]
//  });
//});
  
module.exports = router;