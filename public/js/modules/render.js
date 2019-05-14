import {
  data
} from "./data.js";

export var render = {
  loader: function (id) {
    var id = document.getElementById("wrapper");
    var render = '<img src="img/pokeball.gif " alt="loading">';
    id.insertAdjacentHTML("beforeend", render);
  },

  detail: function (name) {
    var contentwrapper = document.getElementById("wrapper");
    var detail = data.getItem("details");
    detail = data.parse(detail);
    detail = detail.find(match);

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

  overview: function (data) {
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
    contentwrapper.insertAdjacentHTML("beforeend", render);
  },

  fill: function (data) {
    var pokeId = document.getElementById(data.name);
    var render = `<img src="${data.img}" alt="picture of ${data.name}">`;
    pokeId.insertAdjacentHTML("beforeend", render);
  },

  remove: function (id) {
    document.getElementById(id).innerHTML = "";
  }
};