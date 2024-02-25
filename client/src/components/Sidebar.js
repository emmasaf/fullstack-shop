import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-screen bg-gray-300 shadow-md bg-white px-1 w-64">
      <ul className="space-y-2">
        <li>
          <Link to="/shops" className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            Shops
          </Link>
        </li>
        <li>
          <hr/>
        </li>
        <li>
          <Link to="/products" className="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            Products
          </Link>
        </li>
        <li>
          <hr/>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
