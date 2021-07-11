import { DOUGH_TYPES, INGREDIENT_TYPES, SAUCE_TYPES } from "./constants.js";
import sizes from "./enums/sizes";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    type: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
  };
};

export const normalizeSauce = (sauce) => {
  return {
    ...sauce,
    type: SAUCE_TYPES.find(({ label }) => sauce.name === label)?.value,
  };
};

export const normalizeIngredient = (ingredient) => {
  return {
    ...ingredient,
    type: INGREDIENT_TYPES.find(({ label }) => ingredient.name === label)
      ?.value,
    count: 0,
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    type: sizes[size.multiplier],
  };
};
