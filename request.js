const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var xhr = new XMLHttpRequest();

//xhr.open('POST', 'http://localhost:2013/veHiculo', true)
var params = 'jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJ2ZWhpY3Vsby5nZXQiLCJmb3RvLmdldCIsImxpc3RhZG8uZ2V0IiwiYWZpbGlhZG8ucHV0IiwicGFnby5wb3N0Il0sImV4cCI6MTU4Nzc1MDMxMywiaWF0IjoxNTg3NzQ2NzEzLCJjbGllbnRfaWQiOiI5OTk4ODg3Nzc2NjY1NTU0NDQifQ.ptv_IEJWdpi7TuaAP2WNrS-V-Xk4aBTHJ6IPCES2ZktIvEiX9nuWwoHOP3munGz1I6k825yXZNFmthr9mtTKTg'
xhr.open('GET', 'http://proyectosa-aemymiaoda-uc.a.run.app/Vehiculo?'+params, true)

// set `Content-Type` header
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

// pass `params` to `send()` method
//xhr.send(params);
xhr.send();

// listen for `load` event
xhr.onload = () => {
   console.log(xhr.responseText);
}
