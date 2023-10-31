import DashboardItemJobIndex from './DashboardItemJobIndex/DashboardItemJobIndex';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<>
			<div className="dashboard-container">
				<div className="dashboard-item-container">
					<div className="left-job-container">
						<DashboardItemJobIndex indexType="Requested" />
					</div>
					<div className="right-job-container">
						<DashboardItemJobIndex  indexType="Provided" />
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
