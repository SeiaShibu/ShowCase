// Product types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Review[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

// Order types
export interface CartItem {
  _id: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  countInStock: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: User;
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}