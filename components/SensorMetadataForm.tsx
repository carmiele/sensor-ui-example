import { Sensor } from "../interfaces/sensor";

type Props = {
    sensor: Sensor
}

const SensorMetadataForm = ({sensor}: Props) => {

    const inputChangedHandler = (event) => {
        const updatedValue = event.target.value;
    }

    return (<form>
       { sensor?.meta && Object.entries(sensor?.meta).map((value, key) => (
        <div key={key} className="flex">
            <label>{ value[0] }</label>: <input type="text" className="text-gray-700 bg-gray-200 px-4 py-2" value={value[0]} onChange={(event)=>inputChangedHandler(event)}/>
        </div>
       ))}
    </form>
    )
}

export default SensorMetadataForm