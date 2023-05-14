import { Sensor } from "../interfaces/sensor";

type Props = {
    sensor: Sensor
}

const EditSensorBtn = ({ sensor}: Props) => (
    <a className="text-blue-400 cursor-pointer hover:underline">View/Edit</a>
)

export default EditSensorBtn