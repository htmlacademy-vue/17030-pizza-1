import { SET_ENTITY } from "@/store/mutation-types.js";
import user from "@/static/user.json";

export const mocksAddresses = [
  {
    id: 1,
    name: "ул.Невский пр., д.1, кв.2",
    street: "Невский пр.",
    building: "1",
    flat: "2",
    comment: "",
    userId: "123",
  },
  {
    id: 2,
    name: "ул.Невский пр., д.2, кв.22",
    street: "Невский пр.",
    building: "2",
    flat: "22",
    comment: "test comment",
    userId: "123",
  },
];

export const createAddresses = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "addresses",
      value: mocksAddresses,
    },
    { root: true }
  );
};

export const authenticateUser = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "isAuthenticated",
      value: true,
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      entity: "user",
      value: user,
    },
    { root: true }
  );
};
