import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createClientJobs, fetchJobs } from '../../../store/jobs';
import JobItem from './JobItem/JobItem';
import { fetchServices } from '../../../store/services';
import './DashboardItemJobIndex.scss';

const DashboardItemJobIndex = ({ indexType }) => {
	// get all jobs from the store/backend with useEffect and useSelector
	const dispatch = useDispatch();
	const currentUser = useSelector(store => store.session.user);
	const jobs = Object.values(useSelector(store => store.jobs));
	const services = useSelector(state => state.services);

	let filteredJobs;
	indexType === "Requested" ?
		filteredJobs = jobs.filter(job => job.client._id === currentUser._id) :
		filteredJobs = jobs.filter(job => job.provider._id === currentUser._id);

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
				<div className="dashboard-item-header">Your {indexType} Jobs</div>
				<div className="job-index-container">
					{filteredJobs.map(job => {
						const name = indexType === "Requested" ? job.provider.firstName : job.client.firstName;
						const email = indexType === "Requested" ? job.provider.email : job.client.email;
						const location = indexType === "Requested" ? job.provider.location : job.client.location;
						const service = services[job.service];
						return (
							<JobItem
								key={job._id}
								job={job}
								indexType={indexType}
								name={name}
								email={email}
								location={location}
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
