console.log("welkom");

var app = {
  init: function(route) {
    localStorage.clear();

    router.handle();
    window.addEventListener("hashchange", function() {
      router.handle();
    });
  }
};

var router = {
  handle: function() {
    if (window.location.hash.length >= 2) {
      this.detailpage();
    } else {
      this.overview();
    }
  },
  overview: function() {
    routie(
      "",
      (hash = async () => {
        console.log("router.overview");
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
      })
    );
  },
  detailpage: function() {
    routie(
      ":name",
      (name = async () => {
        var pokeName = window.location.hash.slice(1);
        console.log("router.detailpage");
        render.remove("wrapper");

        if (localStorage.length === 0) {
          var urlList = await api.get();
          var detail = await api.detail(urlList);
          // console.log(detail);
          await render.detail(pokeName);
        } else {
          render.detail(pokeName);
        }
      })
    );
  }
};

var api = {
  get: async () => {
    var url = "https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0";
    // eerste fetch
    var response = await fetch(url);
    response = await response.json();
    await data.setItem(response, "urlList");
    // return eerste fetch
    return await response;
  },

  detail: async response => {
    // Detail fetch
    let details = response.results.map(async item => {
      // bevat items na de fetch
      var detailList = await fetch(item.url);
      detailList = await detailList.json();
      // filtered nadat data gefetched is
      var filtered = await data.filter(detailList);

      // returned nadat er gefiltered is
      return await filtered[0];
    });
    // bevat alle items nadat alles binnen is
    var allData = await Promise.all(details);
    // console.log(allData);
    await data.setItem(allData, "details");
    // return eerste fetch
    return await allData;
  }
};

var data = {
  getItem: function(key) {
    var get = localStorage.getItem(key);
    return get;
  },

  setItem: function(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  parse: function(item) {
    var parsed = JSON.parse(item);
    return parsed;
  },

  filter: function(data) {
    // console.log(data);
    var filter = [];
    filter.push({
      id: data.id,
      name: data.name,
      xp: data.base_experience,
      height: data.height,
      weight: data.weight,
      moves: data.moves,
      stats: data.stats,
      type: data.types[0].type.name,
      img: data.sprites.front_default
    });
    return filter;
  }
};

var render = {
  loader: function(id) {
    var id = document.getElementById("wrapper");
    var render = '<img src="img/pokeball.gif " alt="loading">';
    id.insertAdjacentHTML("beforeend", render);
  },

  detail: function(name) {
    console.log(name);
    var contentwrapper = document.getElementById("wrapper");
    var detail = data.getItem("details");
    detail = data.parse(detail);
    detail = detail.find(match);
    console.log(detail);

    function match(detail) {
      return detail.name === name;
    }

    var render = `<div class="detailcard">
    <p class="pokeCP">CP <span>${detail.xp}</span></p>
    <img src="${detail.img}" alt="picture of ${detail.name}">
    <div class="statistics1">
    <p class="pokeName">${detail.name}</p>
    <progress value="100" max="100">
    </div>
    <div class="statistics2">
    <div class="weight"><strong>${detail.weight /
      10}kg</strong><p>WEIGHT</p></div>
    <div class="type"><section class="${detail.type}">${detail.type.slice(
      0,
      1
    )}</section><p>${detail.type}</p></div>
    <div class="height"><strong>${detail.height /
      10}m</strong><p>HEIGHT</p></div>
    </div>
    <div class="statistics3">
    <section><strong>${detail.moves[0].move.name}</strong><p>lvl <strong>${
      detail.moves[0].version_group_details[0].level_learned_at
    }</strong></p></section>
    <section><strong>${detail.moves[1].move.name}</strong><p>lvl <strong>${
      detail.moves[1].version_group_details[0].level_learned_at
    }</strong></p></section>
    </div>
    <a id="exit" class="exit" href="${window.location.pathname}#">X</a>
    </div>`;

    contentwrapper.insertAdjacentHTML("beforeend", render);
  },

  overview: function(data) {
    console.log(data);
    var contentwrapper = document.getElementById("wrapper");
    let render = data.results
      .map(data => {
        return `
      <section class="pokemoncard">
      <picture id="${data.name}">
      </picture>
      <a href="#${data.name}" class="pokeName">${data.name}</a>
      </section>
      `;
      })
      .join("");
    // console.log(render)
    contentwrapper.insertAdjacentHTML("beforeend", render);
  },

  fill: function(data) {
    // console.log(data);
    var pokeId = document.getElementById(data.name);
    var render = `<img src="${data.img}" alt="picture of ${data.name}">`;
    pokeId.insertAdjacentHTML("beforeend", render);
  },

  remove: function(id) {
    console.log("removed " + id);
    document.getElementById(id).innerHTML = "";
  }
};

app.init();
