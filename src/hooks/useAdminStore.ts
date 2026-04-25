import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'Nouvelle' | 'En cours' | 'Terminée';
}

interface AdminStore {
  feedbacks: Feedback[];
  orders: Order[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'date' | 'isRead'>) => void;
  markFeedbackRead: (id: string) => void;
  addOrder: (order: Omit<Order, 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  deleteFeedback: (id: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      feedbacks: [],
      orders: [],
      addFeedback: (data) =>
        set((state) => ({
          feedbacks: [
            {
              ...data,
              id: Math.random().toString(36).substr(2, 9),
              date: new Date().toISOString(),
              isRead: false,
            },
            ...state.feedbacks,
          ],
        })),
      markFeedbackRead: (id) =>
        set((state) => ({
          feedbacks: state.feedbacks.map((f) =>
            f.id === id ? { ...f, isRead: true } : f
          ),
        })),
      addOrder: (data) =>
        set((state) => ({
          orders: [
            {
              ...data,
              date: new Date().toISOString(),
              status: 'Nouvelle',
            },
            ...state.orders,
          ],
        })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),
      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        })),
      deleteFeedback: (id) =>
        set((state) => ({
          feedbacks: state.feedbacks.filter((f) => f.id !== id),
        })),
    }),
    {
      name: 'pouletchic-admin-data',
    }
  )
);
