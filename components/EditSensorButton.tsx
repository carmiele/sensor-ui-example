import { Sensor } from "../interfaces/sensor";
import { useState } from 'react';
import EditSensorModal from "./EditSensorModal";

type Props = {
    sensor: Sensor
}

const EditSensorBtn = ({ sensor}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    
    const openEditDialog = (sensor: Sensor) => {
        setOpen(true);
    }

    return (<>
        <a className="text-blue-500 cursor-pointer hover:underline" onClick={() => openEditDialog(sensor)}>View/Edit</a>
        <EditSensorModal open={open} setOpen={setOpen} sensor={sensor}/>
    </>
    )
}

export default EditSensorBtn