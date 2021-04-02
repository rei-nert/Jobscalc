const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"


const profile = {
	name: "Gabriel Reinert",
	avatar: "https://avatars.githubusercontent.com/u/58665277?v=4",
	"monthly-budget": 3000,
	"days-per-week": 5,
	"hours-per-day": 5,
	"vacations-per-year": 4,
	"value-hour": 75
}


const jobs = [{
	"id": 1,
	"name": "Pizzaria",
	"daily-hours": 5,
	"total-hours": 100,
	"createdAt": Date.now()
}]

function remainingDays(job) {
		const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
		
		const createdDate = new Date(job.createdAt)
		const dueDay = createdDate.getDate() + Number(remainingDays)
		const dueDate = createdDate.setDate(dueDay)

		const timeDiffInMs = dueDate - Date.now()
		const dayInMs =  1000 * 60 * 60 * 24
		const dayDiff = Math.floor(timeDiffInMs/ dayInMs)

		return dayDiff 
}

//GET requisitions
routes.get("/", (req, res) => {
	const updatedJobs = jobs.map((job) => {
		const remaining = remainingDays(job)
		const status = remaining <= 0 ? 'done' : 'progress'

		return {
			...job,
			remaining,
			status,
			"budget": profile['value-hour'] * job['total-hours']
		}

	})

	return res.render(views + "index", { jobs: updatedJobs })
})

routes.get("/job", (req, res) => {
	return res.render(views + "job")
})

routes.get("/job/edit", (req, res) => {
	return res.render(views + "job-edit")
})

routes.get("/profile", (req, res) => {
	return res.render(views + "profile", { profile })
})

//POST requisitions
routes.post("/job", (req, res) => {
	const lastId = jobs[jobs.length - 1]?.id || 0;

	jobs.push({
		"id": lastId + 1,
		"name": req.body.name,
		"daily-hours": req.body["daily-hours"],
		"total-hours": req.body["total-hours"],
		"createdAt": Date.now()
		})
	return res.redirect("/")
})


module.exports = routes
