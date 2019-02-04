var urlAPI = 'https://geek-jokes.sameerkumar.website/api'

console.log("Welcome");

// met behulp van bron: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests

var requestAPI = new XMLHttpRequest();
requestAPI.open("GET", urlAPI, true);
requestAPI.onload = function (e) {
    if (requestAPI.status === 200) {
      console.log(requestAPI.responseText);
    } else {
      console.error(requestAPI.statusText);
    }
};

requestAPI.onerror = function (e) {
  console.error(requestAPI.statusText);
};
requestAPI.send(null);
