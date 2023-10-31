import DashboardItemJobIndex from './DashboardItemJobIndex/DashboardItemJobIndex';
import './Dashboard.scss';

const Dashboard = () => {
	return (
		<>
			<div className="dashboard-container">
				<div className="dashboard-item-container">
					<DashboardItemJobIndex indexType="Requested" />
					<DashboardItemJobIndex indexType="Provided" />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
