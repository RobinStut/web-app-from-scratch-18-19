console.log('welkom');


var app = {

  init: function() {
    localStorage.clear();
    console.log('init');
    if (localStorage.length === 0) {
      // render.loader();
      api.get();

    } else {
      render.overview(data.parse('data'))
      console.log('data al opgehaald');
    }
  },

  development: function() {
    console.log('developer');
  },

};





var router = {
  handle: function(){
    if ((window.location.hash.length) >= 2) {
      console.log('detailpage handler');
      this.detail();
    }
    else {
      console.log('overzichtspage handler');
      this.overview();
    }
  },
  overview: function(){
    routie('', hash => {
    console.log(' ');
    console.log('router.overview');
    app.init();
  });
  },
  detail: function(){
    routie(':name', name => {
    console.log(name);
    console.log(' ');

    console.log(data.find(data.parse(data.getItem('data')), name));
    console.log('detail aangeroepen');
    // app.init();
  });
},
};






var api = {

  get: async function() {
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0';
    var list = await this.call(url);
    data.store(list.results, 'urlList');
    list.results.map(async function(item) {
      var detailList = await api.detail(item.url);
      var filtered = data.filter(detailList);
      render.overview(filtered);
      data.merge(filtered);
    });
  },

  detail: async function(url) {
    var details = [await api.call(url)];
    return details;
  },

  call: async function(url) {
    var data = await fetch(url);
    var res = await data.json();
    return res;
  },

};

var data = {
  getItem:function(key){
    var get = localStorage.getItem(key);
    return get
  },

  store:function(data, key){
    localStorage.setItem(key, JSON.stringify(data));
  },

  parse: function(item) {
    var parsed = JSON.parse(item);
    return parsed;
  },

  merge: function(data) {
    if (localStorage.getItem('data') === null) {
      console.log('if');
      this.store(data, 'data');
    }
    else {
      var currentData = this.parse(this.getItem('data'));
      var newData = data;
      Array.prototype.push.apply(newData, currentData);
      newData.sort(this.sort);
      this.store(newData, 'data');
    }
  },

  filter: function(data) {
    var filter = [];
    filter.push({
      id: data[0].id,
      name: data[0].name,
      xp: data[0].base_experience,
      height: data[0].height,
      weight: data[0].weight,
      moves: data[0].moves,
      stats: data[0].stats,
      type: data[0].types[0].type.name,
      img: data[0].sprites.front_default
    });
    return filter;
  },

  sort: function (dataA, dataB) {
    return dataA.id - dataB.id;
  },

  find: function (data, name) {
    console.log(data);
    console.log(name);

    return data.name === 'name';
}
};



var render = {

  loader: function(id) {
    var id = document.getElementById('wrapper');
    var render = '<img src="img/pokeball.gif " alt="loading">'
    id.insertAdjacentHTML('beforeend', render);
  },

  overview: function(data) {
    console.log(data);
    var id = document.getElementById('wrapper');
    var render = data.map(function(data) {
      return `
          <section class="pokemoncard">
          <p class="pokeCP">CP<span>${data.xp}</span></p>
          <img src="${data.img} " alt="picture of ${data.name}">
          <a href="#${data.name}" class="pokeName">${data.name}</a>
          </section>
          `;
    }).join("");
    id.insertAdjacentHTML('beforeend', render);
  },

  remove: function(id) {
    console.log('removed ' + id);
    document.getElementById(id).innerHTML = '';
  },

};


router.handle();
