import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';
import Spinner from '../components/ui/Spinner';
import { Check, X, ChevronRight } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  const { userInfo, isLoading, error, updateProfile } = useAuthStore();
  const { orders, loading: ordersLoading, error: ordersError, listMyOrders } = useOrderStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      
      if (activeTab === 'orders') {
        listMyOrders();
      }
    }
  }, [userInfo, listMyOrders, activeTab]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    try {
      const updateData: { name?: string; email?: string; password?: string } = {};
      
      if (name !== userInfo?.name) updateData.name = name;
      if (email !== userInfo?.email) updateData.email = email;
      if (password) updateData.password = password;
      
      if (Object.keys(updateData).length === 0) {
        setFormError('No changes to update');
        return;
      }
      
      await updateProfile(updateData);
      setSuccessMessage('Profile updated successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setFormError(err.message || 'Update failed');
    }
  };
  
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs */}
          <div className="md:w-64 mb-6 md:mb-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-6 py-4 font-medium transition-colors flex justify-between items-center ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Profile</span>
                {activeTab === 'profile' && <ChevronRight size={16} />}
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-6 py-4 font-medium transition-colors flex justify-between items-center ${
                  activeTab === 'orders' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>My Orders</span>
                {activeTab === 'orders' && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1">
            {activeTab === 'profile' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
                
                {(error || formError) && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error || formError}
                  </div>
                )}
                
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {successMessage}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Spinner size="sm" color="white" /> : 'Update Profile'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b">My Orders</h2>
                
                {ordersLoading ? (
                  <div className="p-6">
                    <Spinner />
                  </div>
                ) : ordersError ? (
                  <div className="p-6 text-red-600">
                    {ordersError}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-600">You have no orders yet</p>
                    <button
                      onClick={() => navigate('/products')}
                      className="mt-4 inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Paid
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delivered
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order._id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${order.totalPrice.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {order.isPaid ? (
                                <span className="inline-flex items-center text-green-600">
                                  <Check size={16} className="mr-1" />
                                  {new Date(order.paidAt!).toLocaleDateString()}
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-red-600">
                                  <X size={16} className="mr-1" />
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {order.isDelivered ? (
                                <span className="inline-flex items-center text-green-600">
                                  <Check size={16} className="mr-1" />
                                  {new Date(order.deliveredAt!).toLocaleDateString()}
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-red-600">
                                  <X size={16} className="mr-1" />
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Link
                                to={`/order/${order._id}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;