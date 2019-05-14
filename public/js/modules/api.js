import {
  data
} from "./data.js";

export var api = {
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
    console.log(allData);
    await data.setItem(allData, "details");
    // return eerste fetch
    return await allData;
  }
};