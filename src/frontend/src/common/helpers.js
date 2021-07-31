import {
  DOUGH_TYPES,
  FILLING_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
  MISC_ITEMS,
} from "./constants.js";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    type: DOUGH_TYPES.find(({ label }) => dough.name === label)?.value,
    nameAlt: DOUGH_TYPES.find(({ label }) => dough.name === label)?.nameAlt,
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

export const normalizeSize = (size) => {
  return {
    ...size,
    type: SIZE_TYPES.find(({ label }) => size.name === label)?.value,
  };
};

export const normalizeMisc = (misc) => {
  return {
    ...misc,
    slug: MISC_ITEMS.find(({ label }) => misc.name === label)?.value,
  };
};
