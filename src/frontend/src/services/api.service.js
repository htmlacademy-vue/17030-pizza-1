import JwtService from "@/services/jwt.service.js";
import axios from "@/plugins/axios.js";
import resources from "@/common/enums/resources.js";
import {
  DOUGH_TYPES,
  INGREDIENT_TYPES,
  MISC_ITEMS,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants.js";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // async get(id, config = {}) {
  //   const { data } = await axios.get(`${this.#resource}/${id}`, config);
  //   return data;
  // }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;

  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(entity) {
    const { data } = await axios.delete(`${this.#resource}/${entity.id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class AddressApiService extends CrudApiService {
  constructor(notifier) {
    super(resources.ADDRESSES, notifier);
  }

  // TODO: нужна ли нормализация?
  // async query() {
  // }

  // [{
  //   id: 0,
  //   name: "string",
  //   street: "string",
  //   building: "string",
  //   flat: "string",
  //   comment: "string",
  //   userId: "string",
  // }];
}

export class DoughApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.DOUGH, notifier);
  }

  _normalize(oneDough) {
    return {
      ...oneDough,
      type: DOUGH_TYPES.find(({ label }) => oneDough.name === label)?.value,
      nameAlt: DOUGH_TYPES.find(({ label }) => oneDough.name === label)
        ?.nameAlt,
    };
  }

  async query(config = {}) {
    const dough = await super.query(config);
    return dough.map((oneDough) => this._normalize(oneDough));
  }
}

export class IngredientsApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.INGREDIENTS, notifier);
  }

  _normalize(ingredient) {
    return {
      ...ingredient,
      type: INGREDIENT_TYPES.find(({ label }) => ingredient.name === label)
        ?.value,
    };
  }

  async query(config = {}) {
    const ingredients = await super.query(config);
    return ingredients.map((ingredient) => this._normalize(ingredient));
  }
}

export class SaucesApiService extends ReadOnlyApiService {
  constructor(config) {
    super(resources.SAUCES, config);
  }

  _normalize(sauce) {
    return {
      ...sauce,
      type: SAUCE_TYPES.find(({ label }) => sauce.name === label)?.value,
    };
  }

  async query(config = {}) {
    const sauces = await super.query(config);
    return sauces.map((sauce) => this._normalize(sauce));
  }
}

export class SizesApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.SIZES, notifier);
  }

  _normalize(size) {
    return {
      ...size,
      type: SIZE_TYPES.find(({ label }) => size.name === label)?.value,
    };
  }

  async query(config = {}) {
    const sizes = await super.query(config);
    return sizes.map((size) => this._normalize(size));
  }
}

export class MiscApiService extends ReadOnlyApiService {
  constructor(notifier) {
    super(resources.MISC, notifier);
  }

  _normalize(oneMisc) {
    return {
      ...oneMisc,
      type: MISC_ITEMS.find(({ label }) => oneMisc.name === label)?.value,
    };
  }

  async query(config = {}) {
    const misc = await super.query(config);
    return misc.map((oneMisc) => this._normalize(oneMisc));
  }
}
