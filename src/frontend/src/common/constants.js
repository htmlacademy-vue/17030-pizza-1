export const DOUGH_TYPES = [
  {
    label: "Тонкое",
    nameAlt: "на тонком тесте",
    value: "light",
  },
  {
    label: "Толстое",
    nameAlt: "на толстом тесте",
    value: "large",
  },
];

export const SAUCE_TYPES = [
  {
    label: "Томатный",
    value: "tomato",
  },
  {
    label: "Сливочный",
    value: "creamy",
  },
];

export const SIZE_TYPES = [
  {
    label: "23 см",
    value: "small",
  },
  {
    label: "32 см",
    value: "normal",
  },
  {
    label: "45 см",
    value: "big",
  },
];

export const INGREDIENT_TYPES = [
  {
    label: "Грибы",
    value: "mushrooms",
  },
  {
    label: "Чеддер",
    value: "cheddar",
  },
  {
    label: "Салями",
    value: "salami",
  },
  {
    label: "Ветчина",
    value: "ham",
  },
  {
    label: "Ананас",
    value: "ananas",
  },
  {
    label: "Бекон",
    value: "bacon",
  },
  {
    label: "Лук",
    value: "onion",
  },
  {
    label: "Чили",
    value: "chile",
  },
  {
    label: "Халапеньо",
    value: "jalapeno",
  },
  {
    label: "Маслины",
    value: "olives",
  },
  {
    label: "Томаты",
    value: "tomatoes",
  },
  {
    label: "Лосось",
    value: "salmon",
  },
  {
    label: "Моцарелла",
    value: "mozzarella",
  },
  {
    label: "Пармезан",
    value: "parmesan",
  },
  {
    label: "Блю чиз",
    value: "blue_cheese",
  },
];

export const MISC_ITEMS = [
  {
    label: "Cola-Cola 0,5 литра",
    value: "cola",
  },
  {
    label: "Острый соус",
    value: "sauce",
  },
  {
    label: "Картошка из печи",
    value: "potato",
  },
];

export const SEC = 1000;
export const MESSAGE_LIVE_TIME = 3 * SEC;
export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";
export const APP_COUNTER_MIN_VALUE = 0;
export const APP_COUNTER_MAX_VALUE = 3;

/* eslint-disable */
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
/* eslint-enable */
