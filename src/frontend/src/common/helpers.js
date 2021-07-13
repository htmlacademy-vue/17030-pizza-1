import {
  DOUGH_TYPES,
  FILLING_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "./constants.js";

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

export const normalizeFilling = (filling) => {
  return {
    ...filling,
    type: FILLING_TYPES.find(({ label }) => filling.name === label)?.value,
  };
};

export const composeFillingTypeAndCounter = (filling) => {
  return {
    price: filling.price,
    type: FILLING_TYPES.find(({ label }) => filling.name === label)?.value,
    count: 0,
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    type: SIZE_TYPES.find(({ label }) => size.name === label)?.value,
  };
};
