let {productItems} = require('../store/dataStore')

exports.getProduct = (req, res) => {
  const shopId = Number(req.params.shopId);
  const filteredProducts = productItems.filter(product => product.shopId === shopId);

  if (!filteredProducts.length) {
    return res.status(404).send({ error: "No products found for this shop" });
}
  res.json(filteredProducts);
};

exports.
addProduct = (req, res) => {
  const {price,shopId, name } = req.body;
  const newItem = {
    id: productItems.length + 1, 
    name,
    price,
    shopId
  };
  productItems.push(newItem);
  res.status(201).send(newItem);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  productItems = productItems.filter(item => item.id !== parseInt(id));
  res.status(204).send();
};
