fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

//REST API
//URI (identifier)   https://jsonplaceholder.typicode.com:8000/todos/101
//todos/101 — endpoint
//articles/50 — endpoint
//users/654 — endpoint
//todos, articles, users — static parameter
//101, 50, 654 — dynamic parameter

//URL (locator) https://jsonplaceholder.typicode.com

//https — data transfer protocol
//DNS (domain name server) jsonplaceholder.typicode.com
//server address https://192.168.1.205
//port 8000

//URN (name) /todos/101

//https://www.youtube.com/watch?v=6Eb2I6At1k0#title
//watch — начало строки запроса
//? — начало параметров запроса
//v=6Eb2I6At1k0 — querry params
//# — anchor (якорь)

// https://www.google.com/search?q=pizza&rlz=1C1CHBD_enUA809UA809&oq=pizza&aqs=chrome..69i57j0i512l3j0i457i512j0i402j0i512j46i175i199i512j0i512l2.3108j0j15&sourceid=chrome&ie=UTF-8
//q=pizza
//& — разделитель параметров запроса
//rlz=1C1CHBD_enUA809UA809
//последовательность параметров не строгая
