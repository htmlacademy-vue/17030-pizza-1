import { SET_ENTITY } from "@/store/mutation-types.js";

export const mockDough = [
  {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
    type: "light",
    nameAlt: "на тонком тесте",
  },
  {
    id: 2,
    name: "Толстое",
    image: "/public/img/dough-large.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
    type: "large",
    nameAlt: "на толстом тесте",
  },
];

export const mockIngredients = [
  {
    id: 1,
    name: "Грибы",
    image: "/public/img/filling/mushrooms.svg",
    price: 33,
    type: "mushrooms",
  },
  {
    id: 2,
    name: "Чеддер",
    image: "/public/img/filling/cheddar.svg",
    price: 42,
    type: "cheddar",
  },
  {
    id: 3,
    name: "Томаты",
    image: "/public/img/filling/tomatoes.svg",
    price: 35,
    type: "tomatoes",
  },
  {
    id: 4,
    name: "Лосось",
    image: "/public/img/filling/salmon.svg",
    price: 50,
    type: "salmon",
  },
];

export const mockSauces = [
  { id: 1, name: "Томатный", price: 50, type: "tomato" },
  {
    id: 2,
    name: "Сливочный",
    price: 50,
    type: "creamy",
  },
];

export const mockSizes = [
  {
    id: 1,
    name: "23 см",
    image: "/public/img/diameter.svg",
    multiplier: 1,
    type: "small",
  },
  {
    id: 2,
    name: "32 см",
    image: "/public/img/diameter.svg",
    multiplier: 2,
    type: "normal",
  },
  {
    id: 3,
    name: "45 см",
    image: "/public/img/diameter.svg",
    multiplier: 3,
    type: "big",
  },
];

export const mockPizza = {
  id: "1",
  name: "",
  sauceId: 1,
  doughId: 1,
  sizeId: 1,
  quantity: 1,
  ingredients: [],
};

export const createDough = (store) => {
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "dough", value: mockDough },
    { root: true }
  );
};

export const createIngredients = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "ingredients",
      value: mockIngredients,
    },
    { root: true }
  );
};

export const createSauces = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sauces",
      value: mockSauces,
    },
    { root: true }
  );
};

export const createSizes = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      entity: "sizes",
      value: mockSizes,
    },
    { root: true }
  );
};

export const createPizza = (store) => {
  store.commit(
    SET_ENTITY,
    { module: "Builder", entity: "pizza", value: mockPizza },
    { root: true }
  );
};
