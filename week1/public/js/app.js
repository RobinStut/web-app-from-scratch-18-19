//var urlAPI = 'https://geek-jokes.sameerkumar.website/api'
//
//// met behulp van bron: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
//var requestAPI = new XMLHttpRequest();
//requestAPI.open("GET", urlAPI, true);
//requestAPI.onload = function(e) {
//  if (requestAPI.status === 200) {
//    console.log("Juiste status + tekst uitprinten");
//    document.getElementById('joke').innerHTML = requestAPI.responseText;
//  } else {
//    console.error(requestAPI.statusText);
//  }
//};
//
//requestAPI.onerror = function(e) {
//  console.error(requestAPI.statusText);
//};
//requestAPI.send(null);
//
//document.getElementById('button').addEventListener('click', randomJoke);
//
//function randomJoke() {
//  document.getElementById('joke').innerHTML = requestAPI.responseText;
//}

//Old version



var urlAPI = 'https://pokeapi.co/api/v2/pokemon'

// met behulp van bron: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
var requestAPI = new XMLHttpRequest();
requestAPI.open("GET", urlAPI, true);
requestAPI.onload = function(e) {
  if (requestAPI.status === 200) {
    console.log("Juiste status + tekst uitprinten");
    var reqResult = JSON.parse(requestAPI.responseText)
    console.log(reqResult.results);
    // document.getElementById('joke').innerHTML = requestAPI.responseText;
  } else {
    console.error(requestAPI.statusText);
  }
};

requestAPI.onerror = function(e) {
  console.error(requestAPI.statusText);
};
requestAPI.send(null);
