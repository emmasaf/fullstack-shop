import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Products({
  getShops,
  products,
  shops,
  handleAdd,
  getProducts,
  handleDelete,
}) {
  const [showForm, setShowForm] = useState(false)
  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [selectedShopId, setSelectedShopId] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const filterShopId = searchParams.get('filterShopId') || 1

  const handleAddProduct = e => {
    e.preventDefault()

    const newProduct = {
      name: newProductName,
      price: newProductPrice,
      shopId: Number(selectedShopId),
    }
    
    handleAdd(newProduct)
    setShowForm(!showForm)
    setNewProductName('')
    setNewProductPrice('')
  }

  useEffect(() => {
    getProducts(+filterShopId)
    getShops()
  }, [filterShopId])
  return (
    <div>
      <div className="bg-gray-200 p-5">
        <h2 className="text-lg font-bold mb-4">Products</h2>
        <div className="mb-4">
          <label>Choose shop</label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={shops.find(({id})=>id === filterShopId)?.name}
            onChange={e => setSearchParams({ filterShopId: e.target.value })}
          >
            {shops?.map(shop => (
              <option key={shop.id} value={shop.id.toString()}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-5 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddProduct} className="mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productName"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={e => setNewProductName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="productPrice"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productPrice"
              type="text"
              placeholder="Product Price"
              value={newProductPrice}
              onChange={e => setNewProductPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="shopSelect"
            >
              Shop
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="shopSelect"
              value={selectedShopId}
              onChange={e => setSelectedShopId(e.target.value)}
              required
            >
              {shops.map(shop => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save Product
          </button>
        </form>
      )}

      <ul className="pt-5 ">
        {products?.map(product => (
          <li
            key={product.id}
            className="mb-2 bg-gray-100 rounded-md p-2 shadow-sm"
          >
            {product.name} - {product.price} (Shop ID: {product.shopId})
            <button
              onClick={ () =>
                 handleDelete(product.id)
              }
              className="rounded bg-red-400 p-2 ml-3"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
