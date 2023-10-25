import DashboardItemJobIndex from './DashboardItemJobIndex/DashboardItemJobIndex';

import './Dashboard.css';

const Dashboard = () => {
    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-item-container">
                    <DashboardItemJobIndex indexType="requests" />
                    <DashboardItemJobIndex indexType="jobs" />
                </div>
            </div>
        </>
    );
}

export default Dashboard;