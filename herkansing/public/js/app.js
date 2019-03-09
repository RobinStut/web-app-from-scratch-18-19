console.log('welkom');

var app = {
  init: function() {
    console.log('init');
    api.get();
  },
  development: function() {
    console.log('developer');
  }
}

var api = {
  contain: {
    details: []
  },

  get: async function() {
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0'
    var list = await this.call(url);
    list.results.map(function(item) {
      api.detail(item.url)
    })
    data.filter(this.contain.details)
  },

  detail: async function(url) {
    var list = [await api.call(url)];
    Array.prototype.push.apply(api.contain.details, list);
  },

  call: async function(url) {
    var data = await fetch(url);
    var res = await data.json();
    return res
  },
}

var data = {
  filter: function(receivedData) {
    var data = receivedData;
    console.log(typeof data);
    console.log(Array.isArray(data));
    console.log(data);
    console.log([data][1]);
    console.log(data.base_experience);
  },
}








app.init();
