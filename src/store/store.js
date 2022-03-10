import create from "zustand";
import { persist } from "zustand/middleware";

const evetSlice = (set, get) => ({
  categories: null,
  menu: [],
  submenu: [],
  selectedItem: null,
  loading: false,
  fetchEventdata: async () => {
    set({ loading: true });
    const data = await (
      await fetch(
        "https://smartqdemo.firebaseio.com/events-data.json"
      )
    ).json();
    set({
      categories: data.extras.categories,
      menu: data.menu,
      submenu: data.submenu,
      loading: false,
    });
  },
  setSelectedItem: (item) => {
    set({
      selectedItem: item,
    });
  },
});

const cartSlice = (set, get) => ({
  cart: [],
  addToCart: (item) => {
    const cart = get().cart;
    const newCart = [...cart, item];
    set({
      cart: newCart,
    });
  },
  deleteItem: (item) => {
    const cart = get().cart;
    console.log(item);
    const newCart = cart.filter(
      (cartItem) =>
        cartItem.item.foodid !== item.item.foodid
    );
    set({
      cart: newCart,
    });
  },
  clearCart: () => {
    set({
      cart: [],
    });
  },
});

const checkoutSlcies = (set, get) => ({
  orders: [],
  setOrders: () => {
    const orders = get().orders;
    const cartitems = get().cart;
    set({
      orders: [...orders, ...cartitems],
    });
  }
});

const rootSlice = persist(
  (set, get) => ({
    ...evetSlice(set, get),
    ...cartSlice(set, get),
    ...checkoutSlcies(set, get),
  }),
  { name: "food-store" }
);

export const useStore = create(rootSlice);
