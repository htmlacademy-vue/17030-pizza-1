import { SET_ENTITY } from "@/store/mutation-types.js";

export const mocksOrder = {
  id: 3,
  phone: "8800880088",
  userId: "30731b5c-bd69-43e6-bcd6-a8fd119bcb97",
  addressId: 1,
  orderPizzas: [
    {
      id: 3,
      name: "test",
      quantity: 2,
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      orderId: 3,
      ingredients: [{ id: 4, quantity: 1, pizzaId: 3, ingredientId: 1 }],
    },
  ],
  orderMisc: [
    { id: 5, quantity: 1, orderId: 3, miscId: 1 },
    {
      id: 6,
      quantity: 1,
      orderId: 3,
      miscId: 2,
    },
    { id: 7, quantity: 1, orderId: 3, miscId: 3 },
  ],
  orderAddress: {
    id: 1,
    name: "ул.Невский пр., д.1, кв.2",
    street: "Невский пр.",
    building: "1",
    flat: "2",
    comment: "",
    userId: "30731b5c-bd69-43e6-bcd6-a8fd119bcb97",
  },
};

export const queryOrders = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Orders",
      entity: "orders",
      value: [mocksOrder],
    },
    { root: true }
  );
};
