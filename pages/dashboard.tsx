import Layout from '../components/Layout';
import SensorTable from "../components/SensorTable";
import { Sensor } from "../interfaces/sensor";

const DashboardPage = () => (
    <Layout title="Sensor Dashboard">
        <h1 className="text-3xl">Sensor Dashboard</h1>

        <SensorTable></SensorTable>
    </Layout>
)

export default DashboardPage