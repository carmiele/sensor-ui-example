import Layout from "@/components//Layout";
import SensorTable from "@/components/SensorTable";

const DashboardPage = () => (
    <Layout title="Sensor Dashboard">
        <h1 className="text-3xl mb-5">Sensor Dashboard</h1>

        <SensorTable></SensorTable>
    </Layout>
)

export default DashboardPage