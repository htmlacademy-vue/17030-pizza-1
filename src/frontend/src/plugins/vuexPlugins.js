import JWTService from "@/services/jwt.service.js";
import Notifier from "@/plugins/notifier.js";
import { createResources } from "@/common/helpers.js";

export default function (store) {
  store.$jwt = JWTService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
}
