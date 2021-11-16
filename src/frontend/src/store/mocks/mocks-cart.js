import {
  ADD_PIZZA,
  SET_ADDRESS_TO_CART_ORDER,
  SET_ENTITY,
} from "@/store/mutation-types.js";

export const mockCartPizza = {
  id: "1",
  name: "test1",
  sauceId: 1,
  doughId: 1,
  sizeId: 1,
  quantity: 1,
  ingredients: [{ ingredientId: 2, quantity: 2 }],
};

export const mocksCartMisc = [
  {
    id: 1,
    name: "Cola-Cola 0,5 литра",
    image: "/public/img/cola.svg",
    price: 56,
    type: "cola",
  },
  {
    id: 2,
    name: "Острый соус",
    image: "/public/img/sauce.svg",
    price: 10,
    type: "sauce",
  },
  {
    id: 3,
    name: "Картошка из печи",
    image: "/public/img/potato.svg",
    price: 170,
    type: "potato",
  },
];

export const newAddress = {
  street: "",
  building: "",
  flat: "",
  comment: "",
};

export const addPizzaToCart = (store) => {
  store.commit(`Cart/${ADD_PIZZA}`, mockCartPizza);
};

export const createCartMisc = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "misc",
      value: mocksCartMisc,
    },
    { root: true }
  );
};

export const setReceivingMethod = (store, method) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      entity: "receivingMethodValue",
      value: method,
    },
    { root: true }
  );
};

export const setReceivingAddress = (store, address) => {
  store.commit(`Cart/${SET_ADDRESS_TO_CART_ORDER}`, address);
};
