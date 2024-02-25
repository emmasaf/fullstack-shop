// App.js
import React, { useState } from 'react'
import Shops from './components/Shops'
import Products from './components/Products'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import axios from 'axios'

function App() {
  const [shops, setShops] = useState([])
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()
  const filterShopId = searchParams.get('filterShopId') || 1
  const getShops = () => {
    axios
      .get('http://localhost:5000/api/shop')
      .then(response => {
        setShops(response.data)
      })
      .catch(error => console.error('There was an error!', error))
  }

  const getProducts = id => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => console.error('There was an error!', error))
  }

  const handleAddProduct = data => {
    axios
      .post(`http://localhost:5000/api/product`, data)
      .then(response => {
        getProducts(+filterShopId)
      })
      .catch(error => console.error('There was an error!', error))
  }
  const handleAddShop = data => {
    axios
      .post(`http://localhost:5000/api/shop`, data)
      .then(response => {
        getShops()
      })
      .catch(error => console.error('There was an error!', error))
  }
  const handleDeleteShop = id => {
    axios
      .delete(`http://localhost:5000/api/shop/${id}`)
      .then(response => {
        getShops()
      })
      .catch(error => console.error('There was an error!', error))
  }

  const handleDeleteProduct = id => {
    axios
      .delete(`http://localhost:5000/api/product/${id}`)
      .then(response => {
        getProducts(+filterShopId)
      })
      .catch(error => console.error('There was an error!', error))
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route
            path="/shops"
            element={
              <Shops
                handleDelete={handleDeleteShop}
                shops={shops}
                handleAdd={handleAddShop}
                getShops={getShops}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                handleDelete={handleDeleteProduct}
                getShops={getShops}
                products={products}
                getProducts={getProducts}
                handleAdd={handleAddProduct}
                shops={shops}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
