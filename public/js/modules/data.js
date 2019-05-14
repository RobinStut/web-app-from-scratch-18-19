export var data = {
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
