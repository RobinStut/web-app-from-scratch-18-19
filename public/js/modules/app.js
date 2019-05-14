import { router } from "./router.js";

export var app = {
  init: function(route) {
    router.handle();
    window.addEventListener("hashchange", function() {
      router.handle();
    });
  }
};
