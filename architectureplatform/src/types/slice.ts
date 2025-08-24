export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  joinDate?: string;
}

export interface UserState {
  user: User | null;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "تحویل شده" | "در حال پردازش" | "لغو شده" | "در انتظار تایید";
  total: number;
  items: OrderItem[];
}

export interface Service {
  id: string;
  name: string;
  date: string;
  status: "تکمیل شده" | "در حال بررسی" | "در حال انجام" | "لغو شده";
  consultant: string;
  description: string;
}

export interface ProfileState {
  orders: Order[];
  services: Service[];
  notifications: {
    emailOrders: boolean;
    newProducts: boolean;
    weeklyNewsletter: boolean;
  };
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}
