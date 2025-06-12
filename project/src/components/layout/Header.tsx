import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">StyleHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/showcase" className="text-gray-600 hover:text-blue-600 transition-colors">
              Showcase
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              All Products
            </Link>
            <Link to="/products?category=clothing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Clothing
            </Link>
            <Link to="/products?category=electronics" className="text-gray-600 hover:text-blue-600 transition-colors">
              Electronics
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent border-none focus:outline-none flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="p-1">
              <Search size={20} className="text-gray-500" />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-blue-600 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Hello, {userInfo.name}
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button 
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                <User size={24} />
              </Link>
            )}

            <Link to="/profile" className="hidden md:block">
              <Heart size={24} className="text-gray-700 hover:text-blue-600 transition-colors" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-transparent border-none focus:outline-none flex-grow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="p-1">
                <Search size={20} className="text-gray-500" />
              </button>
            </form>

            <div className="flex flex-col space-y-3">
              <Link 
                to="/showcase" 
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Showcase
              </Link>
              <Link 
                to="/products" 
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/products?category=clothing" 
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                to="/products?category=electronics" 
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Electronics
              </Link>

              <div className="border-t border-gray-100 pt-3">
                {userInfo ? (
                  <>
                    <div className="text-sm text-gray-700 py-2">Hello, {userInfo.name}</div>
                    <Link 
                      to="/profile" 
                      className="text-gray-600 hover:text-blue-600 transition-colors py-2 block"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/profile" 
                      className="text-gray-600 hover:text-blue-600 transition-colors py-2 block"
                      onClick={() => setIsOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={() => {
                        logoutHandler();
                        setIsOpen(false);
                      }}
                      className="text-gray-600 hover:text-blue-600 transition-colors py-2 block text-left w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-blue-600 transition-colors py-2 block"
                    onClick={() => setIsOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;