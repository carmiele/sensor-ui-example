import { useEffect, useState } from "react";
import { Sensor } from "../interfaces/sensor";
import EditSensorBtn from "./EditSensorButton";
import SensorTagList from "./SensorTagList";

type Props = {
    sensors: Sensor[]
}
const SensorTable = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/sensors')
            .then((res) => res.json())
            .then((data) => {
                setSensors(data);
                setLoading(false);
            }, (e) => {
                setLoading(false);
            });
    }, []);

    return (<table className="table w-full">
        <thead>
            <tr className="border-b border-gray-400">
                <th className="pr-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Tags</th>
                <th className="pl-6 py-4 text-right">Metadata</th>
            </tr>
        </thead>
        <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {!loading && sensors?.length > 0 && sensors.map((sensor) => (
                <tr key={sensor.id} className="border-b border-gray-200">
                    <td className="pr-6 py-4">{sensor.name || "--"}</td>
                    <td className="px-6 py-4">{sensor.location ? sensor.location.lat + ", " + sensor.location.long : "--"}</td>
                    <td className="px-6 py-4">{sensor?.tags && sensor?.tags.length > 0 ? <SensorTagList tags={sensor.tags} /> : "--"}</td>
                    <td className="pl-6 py-4 text-right">
                        <EditSensorBtn sensor={sensor} />
                    </td>
                </tr>
            ))
            }
            {!loading && (!sensors || sensors?.length === 0) && <tr><td>No data.</td></tr>}
        </tbody>
    </table>)

}

export default SensorTable