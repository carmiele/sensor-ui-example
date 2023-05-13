import Layout from '../components/Layout'

const DashboardPage = () => (
    <Layout title="Sensor Dashboard">
        <h1 className="text-3xl">Sensor Dashboard</h1>

        <table className="table w-full">
            <thead>
                <tr className="border-b border-gray-500">
                    <th className="pr-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Location</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-gray-200">
                    <td className="pr-6 py-4">Test</td>
                    <td className="px-6 py-4">Test</td>
                    <td className="pl-6 py-4 text-right">Edit</td>
                </tr>
            </tbody>
        </table>
    </Layout>
)

export default DashboardPage