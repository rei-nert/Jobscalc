const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {

	save(req, res){
		const jobs = Job.get()
		const lastId = jobs[jobs.length - 1]?.id || 0;
		//Add new job
		jobs.push({
			"id": lastId + 1,
			"name": req.body.name,
			"daily-hours": req.body["daily-hours"],
			"total-hours": req.body["total-hours"],
			"createdAt": Date.now()
		})
		return res.redirect("/")
	},

	create(req, res) {
		return res.render("job")
	},
	show(req, res){
		const jobId = req.params.id
		const jobs = Job.get()
		const profile = Profile.get()

		const job = jobs.find((job) => {
			return Number(job.id) === Number(jobId)
		})


		if (!job) {
			return res.send("Job not found")
		}

		job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

		return res.render("job-edit", { job })
	},
	update(req, res) {
		const jobId = req.params.id
		const jobs = Job.get()

		const job = jobs.find((job) => {
			return Number(job.id) === Number(jobId)
		})


		if (!job) {
			return res.send("Job not found")
		}

		const updatedJobs = {
			...job,
			name: req.body.name,
			"total-hours": req.body['total-hours'],
			"daily-hours": req.body['daily-hours'],
		}

		const newJob = jobs.map((job) => {
			if (Number(job.id) === Number(jobId)){
				return updatedJobs
			}
			return job
		})

		Job.update(newJob)

		res.redirect('/job/' + jobId)
	},
	delete(req, res) {
		const jobId = req.params.id

		Job.delete(jobId)

		return res.redirect("/")
	},
}