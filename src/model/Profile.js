let data = {
	name: "Gabriel Reinert",
	avatar: "https://avatars.githubusercontent.com/u/58665277?v=4",
	"monthly-budget": 3000,
	"days-per-week": 5,
	"hours-per-day": 5,
	"vacation-per-year": 4,
	"value-hour": 100
}


module.exports = {
	get() {
		return data
	},

	update(newData){
		data = newData;
	}
}
