console.log('app.js');

var app = {
  init: function() {
    this.development();
    router.handle();
  },
  development:function(){
    // code kapot op refresh zonder deze regel. Big Thanks to Janno Kapritsias https://github.com/TuriGuilano
    window.addEventListener('hashchange', function() { router.handle() });
    localStorage.clear();
  }
}

export { app };
