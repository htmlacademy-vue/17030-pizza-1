import resources from "@/common/enums/resources.js";
import {
  AuthApiService,
  CrudApiService,
  DoughApiService,
  IngredientsApiService,
  MiscApiService,
  SaucesApiService,
  SizesApiService,
} from "@/services/api.service.js";
import { SET_ENTITY } from "@/store/mutation-types.js";

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.USER]: new CrudApiService(resources.USER, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new DoughApiService(notifier),
    [resources.INGREDIENTS]: new IngredientsApiService(notifier),
    [resources.MISC]: new MiscApiService(notifier),
    [resources.SAUCES]: new SaucesApiService(notifier),
    [resources.SIZES]: new SizesApiService(notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};
