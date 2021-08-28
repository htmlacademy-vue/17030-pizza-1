import { MISC_ITEMS } from "./constants.js";
import resources from "@/common/enums/resources.js";
import {
  AuthApiService,
  CrudApiService,
  DoughApiService,
  IngredientsApiService,
  ReadOnlyApiService,
  SaucesApiService,
  SizesApiService,
} from "@/services/api.service.js";

export const normalizeMisc = (misc) => {
  return {
    ...misc,
    type: MISC_ITEMS.find(({ label }) => misc.name === label)?.value,
  };
};

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.USER]: new CrudApiService(resources.USER, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new DoughApiService(notifier),
    [resources.INGREDIENTS]: new IngredientsApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.SAUCES]: new SaucesApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new SizesApiService(resources.SIZES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};
