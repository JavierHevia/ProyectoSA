//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function post() {

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "http://esb-danii-mor.eastus.azurecontainer.io/")
	xmlhttp.setRequestHeader("Content-Type", "application/json")
	//xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*")

	xmlhttp.onload = function () {

		if(this.status == 200) {
			console.log(this.responseText)
		}
	}
	var myjson = { "user": "HEVIA", "response": { "msg": "masVOS" } }
	xmlhttp.send(JSON.stringify(myjson))
}