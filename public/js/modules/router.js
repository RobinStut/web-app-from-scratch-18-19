import { data } from "./data.js";
import { api } from "./api.js";
import { render } from "./render.js";

export var router = {
  handle: function() {
    if (window.location.hash.length >= 2) {
      this.detailpage();
    } else {
      this.overview();
    }
  },
  overview: function() {
    routie("", async function(hash) {
      render.remove("wrapper");

      if (localStorage.length === 0) {
        var skeleton = await api.get();
        render.overview(await skeleton);
        var detail = await api.detail(skeleton);
        var fill = await detail.map(item => {
          render.fill(item);
        });
      } else {
        var skeleton = data.getItem("urlList");
        render.overview(data.parse(skeleton));
        var detail = data.getItem("details");
        detail = data.parse(detail);
        var fill = detail.map(item => {
          render.fill(item);
        });
      }
    });
  },
  detailpage: function() {
    routie(
      ":name",
      (name = async () => {
        var pokeName = window.location.hash.slice(1);
        render.remove("wrapper");

        if (localStorage.length === 0) {
          var urlList = await api.get();
          var detail = await api.detail(urlList);
          await render.detail(pokeName);
        } else {
          render.detail(pokeName);
        }
      })
    );
  }
};
