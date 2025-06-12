import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import Spinner from '../components/ui/Spinner';

const PlaceOrderPage: React.FC = () => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    clearCart,
  } = useCartStore();
  
  const { order, error, loading, success, createOrder, resetOrder } = useOrderStore();
  const navigate = useNavigate();
  
  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = itemsPrice * 0.15;
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, paymentMethod, shippingAddress]);
  
  useEffect(() => {
    if (success && order) {
      navigate(`/order/${order._id}`);
      resetOrder();
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, success, order]);
  
  const placeOrderHandler = async () => {
    try {
      await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Review Your Order</h1>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Shipping Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping</h2>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> {shippingAddress?.address}, {shippingAddress?.city},{' '}
                  {shippingAddress?.postalCode}, {shippingAddress?.country}
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment</h2>
                <p className="text-gray-700 mb-2">
                  <strong>Method:</strong> {paymentMethod}
                </p>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <h2 className="text-xl font-semibold p-6 border-b">Order Items</h2>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item._id} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-16 sm:h-16 h-24 w-full mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between mb-2">
                          <Link to={`/product/${item._id}`}>
                            <h3 className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                        </div>
                        <div className="text-gray-600">
                          {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Items:</span>
                    <span>${itemsPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span>
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
                
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0 || loading}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? <Spinner size="sm" color="white" /> : 'Place Order'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;