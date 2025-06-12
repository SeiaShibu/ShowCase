import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate cart totals
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = itemsPrice * 0.15;
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  
  const checkoutHandler = () => {
    userInfo ? navigate('/shipping') : navigate('/login?redirect=shipping');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 lg:mb-0">
              {/* Cart Items */}
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <motion.li
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-24 sm:h-24 h-32 w-full mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex-1">
                      <div className="flex justify-between">
                        <Link to={`/product/${item._id}`}>
                          <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <label htmlFor={`quantity-${item._id}`} className="mr-2 text-gray-700 text-sm">
                            Qty:
                          </label>
                          <select
                            id={`quantity-${item._id}`}
                            value={item.qty}
                            onChange={(e) => updateCartQuantity(item._id, Number(e.target.value))}
                            className="border rounded-md p-1 text-sm"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (15%):</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>${shippingPrice.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={checkoutHandler}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;