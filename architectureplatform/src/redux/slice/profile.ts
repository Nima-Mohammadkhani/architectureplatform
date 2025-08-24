import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, ProfileState, Service } from "../../types/slice";

const initialState: ProfileState = {
  orders: [
    {
      id: "1001",
      date: "1403/12/10",
      status: "تحویل شده",
      total: 1250000,
      items: [
        { name: "کتاب معماری معاصر ایران", quantity: 1, price: 450000 },
        { name: "ماکت ویلای مدرن", quantity: 1, price: 800000 },
      ],
    },
    {
      id: "1002",
      date: "1403/12/05",
      status: "در حال پردازش",
      total: 680000,
      items: [
        { name: "مجموعه تکسچر چوب طبیعی", quantity: 1, price: 180000 },
        { name: "ست خودکار طراحی معماری", quantity: 1, price: 500000 },
      ],
    },
  ],
  services: [
    {
      id: "2001",
      name: "مشاوره طراحی داخلی",
      date: "1403/11/28",
      status: "تکمیل شده",
      consultant: "مهندس احمدی",
      description: "مشاوره برای طراحی داخلی آپارتمان ۱۲۰ متری",
    },
    {
      id: "2002",
      name: "محاسبه هزینه پروژه",
      date: "1403/11/25",
      status: "در حال بررسی",
      consultant: "مهندس رضایی",
      description: "برآورد هزینه ساخت ویلای ۳۰۰ متری",
    },
  ],
  notifications: {
    emailOrders: true,
    newProducts: true,
    weeklyNewsletter: false,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.unshift(action.payload);
    },
    updateServiceStatus: (
      state,
      action: PayloadAction<{ id: string; status: Service["status"] }>
    ) => {
      const service = state.services.find((s) => s.id === action.payload.id);
      if (service) {
        service.status = action.payload.status;
      }
    },
    updateNotifications: (
      state,
      action: PayloadAction<Partial<ProfileState["notifications"]>>
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    clearServices: (state) => {
      state.services = [];
    },
    clearAllProfileData: (state) => {
      state.orders = [];
      state.services = [];
      state.notifications = {
        emailOrders: false,
        newProducts: false,
        weeklyNewsletter: false,
      };
    },
  },
});

export const {
  addOrder,
  updateOrderStatus,
  addService,
  updateServiceStatus,
  updateNotifications,
  clearOrders,
  clearServices,
  clearAllProfileData,
} = profileSlice.actions;

export default profileSlice.reducer;
