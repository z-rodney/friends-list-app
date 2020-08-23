const Sequelize = require("sequelize")
const pg = require("pg") //[PK] Unused -- why require?
const databaseUrl =
	process.env.DATABASE_URL || "postgres://localhost:5432/friendslistapp"
const db = new Sequelize(databaseUrl, {
	logging: false,
})
const { STRING, INTEGER } = Sequelize

const Friend = db.define("friend", {
	name: {
		type: STRING,
		unique: true,
		allowNull: false,
	},
	rating: {
		type: INTEGER,
		defaultValue: 5,
	},
})

//[PK] Great use of class and instance methods to keep your route logic clean!

Friend.findAndOrder = function () {
	return this.findAll({
		order: [["rating", "DESC"]],
	})
}

Friend.prototype.add = function () {
	this.increment("rating", { by: 1 })
	this.reload()
	//[PK] Interesting, I didn't know about `reload` and I had to look it up! It looks like in your routes you don't make further use of the Sequelize instance, however, so I'm not sure why you need it (unless I'm missing something)
}

Friend.prototype.subtract = function () {
	this.decrement("rating", { by: 1 })
	this.reload()
}

module.exports = {
	db,
	Friend,
}
