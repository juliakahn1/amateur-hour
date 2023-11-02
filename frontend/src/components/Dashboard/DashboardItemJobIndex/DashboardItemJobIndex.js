import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createClientJobs, fetchJobs } from '../../../store/jobs';
import JobItem from './JobItem/JobItem';
import { fetchServices } from '../../../store/services';
import { statusOptions, clientStatusPriority } from '../../../constants';
import './DashboardItemJobIndex.scss';

const DashboardItemJobIndex = ({ indexType }) => {
	// get all jobs from the store/backend with useEffect and useSelector
	const dispatch = useDispatch();
	const currentUser = useSelector(store => store.session.user);
	const jobs = Object.values(useSelector(store => store.jobs));
	const services = useSelector(state => state.services);
	const [sortBy, setSortBy] = useState("Date");

	let filteredJobs;
	indexType === "Requested" ?
		filteredJobs = jobs.filter(job => job.client._id === currentUser._id) :
		filteredJobs = jobs.filter(job => job.provider._id === currentUser._id);

	// helper function to extract a job's provider or client based on the indexType propr
	// for sorting and JobItem props
	const jobUser = (job) => {
		return indexType === "Requested" ? job.provider : job.client;
	}

	if (sortBy !== "") {
		switch (sortBy) {
			case "Date":
				filteredJobs.sort((job1, job2) => {
					if (job1.date < job2.date) return -1;
					else if (job1.date > job2.date) return 1;
					else return 0;
				});
				break;
			case "Status":
				filteredJobs.sort((job1, job2) => {
					var job1StatusIndex;
					var job2StatusIndex;
					if (indexType === "Requested") {
						job1StatusIndex = clientStatusPriority.indexOf(job1.statusDescription);
						job2StatusIndex = clientStatusPriority.indexOf(job2.statusDescription);
					} else {
						job1StatusIndex = statusOptions.indexOf(job1.statusDescription);
						job2StatusIndex = statusOptions.indexOf(job2.statusDescription);
					}
					if (job1StatusIndex < job2StatusIndex) return -1;
					else if (job1StatusIndex > job2StatusIndex) return 1;
					else return 0;
				});
				break;
			case "Location":
				filteredJobs.sort((job1, job2) => {
					const job1User = jobUser(job1);
					const job2User = jobUser(job2);
					if (job1User.location < job2User.location) return -1;
					else if (job1User.location > job2User.location) return 1;
					else return 0;
				});
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		if (jobs.length === 0) dispatch(fetchJobs())
		if (Object.values(services).length === 0) dispatch(fetchServices())
		if (indexType === "Requested" && filteredJobs.length === 0) {
			const randServices = Object.values(services).sort(() => 0.5 - Math.random()).slice(0, 4)
			dispatch(createClientJobs(randServices, currentUser._id))
		}
	}, []);

	return (
		<>
			<div className="dashboard-item-job-index-container">
				<div className="dashboard-item-header">{indexType} Jobs</div>
				<div className="dashboard-item-sort-options">
					<div>Sort By</div>
					<div>
						<input
							value="Date"
							className=""
							type="radio"
							name={`${indexType}-radio-sort`}
							checked={sortBy === "Date"}
							onChange={() => setSortBy("Date")}
						/>
						<div>Date</div>
					</div>
					<div>
						<input
							value="Status"
							className=""
							type="radio"
							name={`${indexType}-radio-sort`}
							checked={sortBy === "Status"}
							onChange={() => setSortBy("Status")}
						/>
						<div>Status</div>
					</div>
					<div>
						<input
							value="Location"
							className=""
							type="radio"
							name={`${indexType}-radio-sort`}
							checked={sortBy === "Location"}
							onChange={() => setSortBy("Location")}
						/>
						<div>Location</div>
					</div>
				</div>
				<div className="job-index-container">
					{filteredJobs.map(job => {
						const jobItemUser = jobUser(job);
						const service = services[job.service];
						return (
							<JobItem
								key={job._id}
								job={job}
								indexType={indexType}
								name={jobItemUser.firstName}
								email={jobItemUser.email}
								location={jobItemUser.location}
								service={service}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default DashboardItemJobIndex;
