//[PK] Wow, this is really beautiful. Super clean organized code, awesome styling, and best of all, really user-friendly error-handling. Way above and beyond, A+++.

const friendList = document.getElementById("friend-list")
const createFriend = document.getElementById("create-friend-button")
const friendName = document.getElementById("friend-name")
const formSection = document.querySelector("#friend-form-section")

const generateButton = (type, sign, id) => {
	const button = document.createElement("button")
	button.formAction = `/api/friends/${id}`
	button.className = `${type}-friend`
	button.innerText = sign
	button.type = "button"
	return button
}

const generateForm = id => {
	const form = document.createElement("form")
	form.className = "friend-actions"
	const buttons = [
		generateButton("increment", "+", id),
		generateButton("decrement", "-", id),
		generateButton("delete", "x", id),
	]
	form.append(...buttons)
	return form
}

const generateError = (text, parent) => {
	const p = document.createElement("p")
	p.innerText = text
	p.className = "error-msg"
	parent.append(p)
}

const loadData = data => {
	data.forEach(elem => {
		let friend = document.createElement("li")
		let rating = document.createElement("p")
		rating.innerText = elem.rating
		friend.innerText = elem.name
		let form = generateForm(elem.id)
		friend.append(rating, form)
		friendList.appendChild(friend)
	})
}

const getData = async () => {
	const response = await fetch("api/friends")
	const data = await response.json()
	loadData(data)
}

const clearElement = parent => {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild)
	}
}

createFriend.addEventListener("click", async e => {
	if (document.querySelector(".error-msg"))
		document.querySelector(".error-msg").remove()
	if (friendName.value) {
		const response = await fetch("api/friends", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				name: friendName.value,
			}),
		})
		friendName.value = ""
		const data = await response.json()
		if (data.errors) {
			//[PK] Wow, nice use of the fetch API
			generateError(data.errors[0].message, formSection)
		} else {
			clearElement(friendList)
			getData()
		}
		console.log(data)
	} else {
		if (formSection.lastElementChild.tagName !== "P") {
			generateError("Name cannot be empty", formSection)
		}
	}
})

friendList.addEventListener("click", async e => {
	if (e.target.tagName === "BUTTON") {
		let response
		if (e.target.className.includes("increment")) {
			response = await fetch(e.target.formAction, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "add",
				}),
			})
		} else if (e.target.className.includes("decrement")) {
			response = await fetch(e.target.formAction, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "subtract",
				}),
			})
		} else {
			response = await fetch(e.target.formAction, { method: "delete" })
		}
		let data = await response.json()
		clearElement(friendList)
		loadData(data)
	}
})

getData()
