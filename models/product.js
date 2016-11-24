var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  category: {
    main: {type: String, required: true},
    sub: {type: String},
  },
  product: {
    name: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    size: {type: String, required: true},
    qty: {type: Number, required: true},
    code:{type: Number, required: true}
  },
  description: {
    details: {type: String, required: true},
    content_care: {
      material: {type: String, required: true}, 
      wash: {type: String, required: true},
      dry: {type: String, required: true}
    },
    size: {
      circumfrence: {type: String},
      width: {type: String, required: true},
      length: {type: String, required: true}
    }
  }
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
