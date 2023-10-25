import './DashboardItemJobIndex.css';

const DashboardItemJobIndex = ({indexType}) => {
    return (
        <>
            <div className="dashboard-item-job-index-container">
                <div className="dashboard-item-header">{indexType}</div>
            </div>
        </>
    );
}

export default DashboardItemJobIndex;