import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const toast = {
  create(msg: string, options?: Toastify.Options) {
    Toastify({
      ...options,
      text: msg,
      stopOnFocus: true,
      position: "center",
    }).showToast();
    return;
  },
  error(msg: string, options?: Toastify.Options) {
    return this.create(msg, {
      className: "toastify error",
      ...options,
    });
  },
};
