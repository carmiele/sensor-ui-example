import { Sensor } from "../interfaces/sensor";
import EditSensorBtn from "./EditSensorButton";
import SensorTagList from "./SensorTagList";

type Props = {
    sensors: Sensor[]
}
const SensorTable = ({ sensors }: Props) => (
    <table className="table w-full">
        <thead>
            <tr className="border-b border-gray-400">
                <th className="pr-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Tags</th>
                <th className="pl-6 py-4 text-right">Metadata</th>
            </tr>
        </thead>
        <tbody>
            {sensors.map((sensor) => (
                <tr key={ sensor.id } className="border-b border-gray-200">
                    <td className="pr-6 py-4">{sensor.name || "--"}</td>
                    <td className="px-6 py-4">{ sensor.location ? sensor.location.lat + ", " + sensor.location.long : "--" }</td>
                    <td className="px-6 py-4">{ sensor?.tags && sensor?.tags.length > 0 ? <SensorTagList tags={sensor.tags}/> : "--"  }</td>
                    <td className="pl-6 py-4 text-right">
                        <EditSensorBtn sensor={sensor}/>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)

export default SensorTable