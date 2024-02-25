let {shopItems,productItems} = require('../store/dataStore')

exports.getShopItems = (req, res) => {
  res.json(shopItems);
};

exports.addShopItem = (req, res) => {
  const { name } = req.body;
  const newItem = {
    id: shopItems.length + 1, // Simplistic approach for ID generation
    name,
  };
  shopItems.push(newItem);
  res.status(201).send(newItem);
};

exports.deleteShopItem = (req, res) => {
  const { id } = req.params;
  shopItems = shopItems.filter(item => item.id !== parseInt(id));
  productItems = productItems.filter(product => product.shopId !== parseInt(id));

  res.status(204).send();
};
