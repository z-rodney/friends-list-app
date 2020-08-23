const express = require("express")
const app = express() //[PK] Unused -- why create an app here? There should be only one app!
const router = express.Router()
const { db, Friend } = require("./db") //[PK] `db` unused -- why require it in?

router.get("/", async (req, res, next) => {
	try {
		const data = await Friend.findAndOrder()
		res.json(data)
	} catch (err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const newFriend = await Friend.create({
			name: req.body.name,
		})
		res.json(newFriend)
	} catch (err) {
		next(err)
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const friend = await Friend.findOne({ where: { id: req.params.id } })
		req.body.type === "add" ? friend.add() : friend.subtract()
		const data = await Friend.findAndOrder()
		//[PK] Nice! You could also think about doing the ordering on the front-end, that way you don't need to send the entire list back to the client, just the one friend that was created.
		res.send(data)
	} catch (err) {
		next(err)
	}
})

//[PK] -- Duplicate route?
router.put("/:id", async (req, res, next) => {
	try {
		let friend = await Friend.findOne({ where: { id: req.params.id } })
		req.body.type === "add" ? friend.add() : friend.subtract()
		const data = await Friend.findAndOrder()
		res.send(data)
	} catch (err) {
		next(err)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		await Friend.destroy({ where: { id: req.params.id } })
		const data = await Friend.findAndOrder()
		res.send(data)
	} catch (err) {
		next(err)
	}
})

module.exports = router
