import { router } from "./router.js";

export var app = {
  init: function(route) {
    // localStorage.clear();

    router.handle();
    window.addEventListener("hashchange", function() {
      router.handle();
    });
  }
};
