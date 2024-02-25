import React, { useEffect, useState } from 'react'

export default function Shops({handleDelete, shops, getShops, handleAdd }) {
  const [showForm, setShowForm] = useState(false)
  const [newShopName, setNewShopName] = useState('')

  const handleAddShop = e => {
    e.preventDefault()

    const newShop = {
      name: newShopName,
    }

    handleAdd(newShop)
    setNewShopName('')
    setShowForm(false)
  }

  useEffect(() => {
    getShops()
  }, [])
  return (
    <div>
      <div className='bg-gray-200 p-5'>
        <h2 className="text-lg font-bold mb-4">Shops</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Shop'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddShop} className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="shopName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              value={newShopName}
              onChange={e => setNewShopName(e.target.value)}
              placeholder="Enter shop name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Shop
          </button>
        </form>
      )}

      <ul className='pt-5'>
        {shops.map(shop => (
          <li key={shop.id} className="mb-2 bg-gray-100 rounded-md p-2 shadow-sm">
            {shop.name}
            <button onClick={()=>handleDelete(shop.id)} className='rounded bg-red-400 p-2 ml-3'>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
