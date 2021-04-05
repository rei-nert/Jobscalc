let	data = [
	{
		"id": 1,
		"name": "Pizzaria",
		"daily-hours": 5,
		"total-hours": 1,
		"createdAt": Date.now(),
		"budget": 4500
	},
	{
		"id": 2,
		"name": "Gabriel",
		"daily-hours": 10,
		"total-hours": 100,
		"createdAt": Date.now(),
		"budget": 4500
	}
]

module.exports = {
	get(){
		return data
	},
	update(newJob) {
		data = newJob
	},
	delete(id) {
		data  =  data.filter((job) => {
			return Number(job.id) !== Number(id)
		})
	},
}
