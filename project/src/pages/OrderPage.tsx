import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import Spinner from '../components/ui/Spinner';
import { Check, X, ArrowLeft } from 'lucide-react';

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { order, loading, error, getOrderDetails } = useOrderStore();
  
  useEffect(() => {
    if (id) {
      getOrderDetails(id);
    }
    window.scrollTo(0, 0);
  }, [getOrderDetails, id]);
  
  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center flex-col">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Go to Home
        </Link>
      </div>
    );
  }
  
  if (!order) return null;
  
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex items-center">
          <Link to="/profile" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 ml-6">Order {order._id}</h1>
        </div>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="col-span-2">
            {/* Shipping Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shipping</h2>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {order.user.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> {order.user.email}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <div className="mt-4">
                <div className={`flex items-center ${order.isDelivered ? 'text-green-600' : 'text-red-600'}`}>
                  {order.isDelivered ? (
                    <>
                      <Check size={18} className="mr-2" />
                      <p>Delivered on {new Date(order.deliveredAt!).toLocaleDateString()}</p>
                    </>
                  ) : (
                    <>
                      <X size={18} className="mr-2" />
                      <p>Not Delivered</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <p className="text-gray-700 mb-2">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              <div className="mt-4">
                <div className={`flex items-center ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                  {order.isPaid ? (
                    <>
                      <Check size={18} className="mr-2" />
                      <p>Paid on {new Date(order.paidAt!).toLocaleDateString()}</p>
                    </>
                  ) : (
                    <>
                      <X size={18} className="mr-2" />
                      <p>Not Paid</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <h2 className="text-xl font-semibold p-6 border-b">Order Items</h2>
              <ul className="divide-y divide-gray-200">
                {order.orderItems.map((item) => (
                  <li key={item.product} className="p-6 flex flex-col sm:flex-row">
                    <div className="sm:w-16 sm:h-16 h-24 w-full mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex-1">
                      <div className="flex justify-between mb-2">
                        <Link to={`/product/${item.product}`}>
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
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Items:</span>
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>${order.taxPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>${order.shippingPrice.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total:</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment buttons would go here if implemented */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;