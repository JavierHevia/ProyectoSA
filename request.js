var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var xhr = new XMLHttpRequest()

var params = 'jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJpbnYwMSIsInNjb3BlIjoiW1widmVoaWN1bG8uZ2V0XCIsIFwiZm90by5nZXRcIiwgXCJlc3RhZG8uZ2V0XCIsIFwidmVoaWN1bG8ucHV0XCJdIiwiZXhwIjoxNTg4MDQwMjE5LCJpYXQiOjE1ODgwMzY2MTl9.LrxF1-wS129IMl9v7kbdyOZUuhO-bRnS5Ev6gOfL9msBnfBG7L-JCTaT7-USzoQr16UrnH-Xk0v2YkPcgDLUfQ'

// configure a `POST` request
xhr.open('GET', 'https://proyectosa-aemymiaoda-uc.a.run.app/Vehiculo?' + params, true)

xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

console.log('asdf')
xhr.send()

// listen for `load` event
xhr.onload = () => {
  console.log(xhr.responseText)
}
xhr.onerror = () => {
  console.error('Request failed.')
}
xhr.onprogress = (event) => {
  console.log(`Downloaded ${event.loaded} of ${event.total}`)
}
