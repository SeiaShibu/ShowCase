import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('CreditCard');
  const { shippingAddress, savePaymentMethod } = useCartStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Select Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CreditCard"
                    checked={paymentMethod === 'CreditCard'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3 flex items-center">
                    <CreditCard size={20} className="text-gray-600 mr-2" />
                    <span>Credit / Debit Card</span>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3 flex items-center">
                    <DollarSign size={20} className="text-gray-600 mr-2" />
                    <span>PayPal</span>
                  </div>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Continue to Review Order
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;