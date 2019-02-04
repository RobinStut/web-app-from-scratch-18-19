const url = 'https://geek-jokes.sameerkumar.website/api'

console.log("Welcome");

// bron van hulp: https://medium.freecodecamp.org/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa
fetch(url)
.then(data=>{return data.json()})
.then(res=>{console.log(res)})
