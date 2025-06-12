import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { motion } from 'framer-motion';

const ShippingPage: React.FC = () => {
  const { shippingAddress, saveShippingAddress } = useCartStore();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };
  
  return (
    <div className="min-h-[70vh] py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Shipping Details</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your street address"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your city"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your postal code"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your country"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Continue to Payment
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPage;