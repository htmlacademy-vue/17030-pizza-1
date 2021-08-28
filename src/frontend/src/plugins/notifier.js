import notificationTypes from "@/common/enums/notificationTypes.js";

export default class Notifier {
  #store;

  constructor(store) {
    console.log("Notifier constructor");
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.INFO,
    });
  }

  success(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.SUCCESS,
    });
  }

  error(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.ERROR,
    });
  }

  warning(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: notificationTypes.WARNING,
    });
  }
}
