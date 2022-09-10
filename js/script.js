window.addEventListener("DOMContentLoaded", () => {

	const form = document.querySelector("form");

	function requestGet() {
		// *****   Get XMLHttpRequest   *****

		// const myRequest = new XMLHttpRequest();

		// myRequest.open("GET", "http://localhost:3000/people");
		// myRequest.setRequestHeader("Content-type", "application/json; charset=utf8");
		// myRequest.send();

		// myRequest.addEventListener("readystatechange", function() {
		// 	if(myRequest.readyState == 4 && myRequest.status == 200) {
		// 		let data = JSON.parse(myRequest.response);
		// 		console.log(data);
		// 	} else {
		// 		console.error("Something was gone wrong!");
		// 	}
		// })

				//***** or ***** 
		// myRequest.addEventListener("load", function() {
		// 	if(myRequest.status == 200) {
		// 		let data = JSON.parse(myRequest.response);
		// 		console.log(data);
		// 		creatCards(data);
				
		// 	} else {
		// 		console.error("Something was gone wrong!");
		// 	}
		// })

		// *****   Get FETCH   *****

		// 	getResource("http://localhost:3000/people")
		// 		.then(data => creatCards(data))
		// 		.catch(err => console.error(err));

		// *****   Get AXIOS   *****

		getResource("http://localhost:3000/people")
		.then(data => creatCards(data.data))
		.catch(err => console.error(err));

		document.querySelector("form").remove();

		this.remove();
	} // end of requestGet

	function requestPost(e) {
		e.preventDefault();

		let formData = new FormData(form);

		formData.append("photo", "https://source.unsplash.com/random/1600x900/?portrait");
		formData.append("id", Date.now());

		let objFormData = {};

		formData.forEach((value, key) => {
			objFormData[key] = value;
		});

		// json = JSON.stringify(objFormData);

		// *****   Post XMLHttpRequest   *****

		// const myRequest = new XMLHttpRequest();

		// myRequest.open("POST", "http://localhost:3000/people");
		// myRequest.setRequestHeader("Content-type", "application/json; charset=utf8");
		// myRequest.send(json);

		// myRequest.addEventListener("load", function() {
		// 	if(myRequest.status == 200) {
		// 		let data = JSON.parse(myRequest.response);
		// 		console.log(data);
				
		// 	} else {
		// 		console.error("Something was gone wrong!");
		// 	}
		// })

		// *****   Post FETCH   *****

		// postResource("http://localhost:3000/people", objFormData)
		// 	.then(data => creatCards(data))
		// 	.catch(err => console.error(err));

		// *****   Post Axios   *****
		axios.post("http://localhost:3000/people", objFormData);

		document.querySelector("form").reset();

	} // end of requestPost

	
	document.querySelector("button").addEventListener("click", requestGet, {"once": true});

	form.addEventListener("submit", (e) => requestPost(e), {"once": true});

	async function getResource(url) {

		// ***** FETCH *****

		// const myResponse = fetch(`${url}`);
		// if (myResponse.status !== 200) {
		// 	throw new Error (`Could not fetch ${url}, status: ${myResponse.status}`);
		// }
		// return await myResponse.json();

		// ***** AXIOS *****

		const myResponse = await axios(`${url}`);

		if (myResponse.status !== 200) {
			throw new Error (`Could not fetch ${url}, status: ${myResponse.status}`);
		}

		return myResponse;
	}

	// *****   Post FETCH uses this function  *****

	// async function postResource(url, data) {
	// 	const myResponse = await fetch(`${url}`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-type": "application/json"
	// 		},
	// 		body: JSON.stringify(data)
	// 	});

	// }

	function creatCards (response) {
		response.forEach(item => {
			let card = document.createElement('div');

			let icon = item.sex == "male" ? "icons/mars.png" : "icons/venus.png"

			card.classList.add('card');

			card.innerHTML = `
				<img src="${item.photo}" alt="photo">
				<div class="name">${item.name} ${item.surname}</div>
				<div class="sex">
					<img src=${icon} alt="icon">
				</div>
				<div class="age">${item.age}</div>
			`;
			document.querySelector('.app').appendChild(card);
		})
	}
});


