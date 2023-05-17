import { ChangeEvent, useEffect, useState } from "react";
import { Sensor } from "../interfaces/sensor";
import EditSensorBtn from "./EditSensorButton";
import SensorTagList from "./SensorTagList";

const SensorTable = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [allSensors, setAllSensors] = useState<Sensor[]>([]);
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    /**
     * Handles search term for particular field/filter
     * Only handles singular value (for now)
     * @param field
     * @param event
     */
    const searchSensors = (field: string, event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        const updatedFilters = { ...filters };
        updatedFilters[field] = val;

        // update filters with the requested term
        setFilters(updatedFilters);
    };

    /**
     * Filters list of sensors by the requested search terms
     */
    const filterSensors = () => {
        let filteredSensors: Sensor[] = allSensors;

        for (const [key, val] of Object.entries(filters)) {

            filteredSensors = filteredSensors.filter((sensor) => {
                // field does not exist in entry.
                // exclude from filtered results
                if (!(key in sensor)) {
                    return;
                }

                let valString = "";

                //transform value to string for easy term find
                if (sensor[key] instanceof Array) {
                    valString = sensor[key].toString();
                } else {
                    valString = JSON.stringify(sensor[key]);
                }

                // At least partial term found.
                // return in list of filtered results
                if (valString.includes(val)) {
                    return sensor;
                }
            });
        }
        setSensors(filteredSensors);
    };

    useEffect(() => {
        // sensors are filtered per each filter change
        filterSensors();
    }, [filters]);

    const getAllSensors = () => {
        fetch("/api/sensors")
            .then((res) => res.json())
            .then((data) => {
                // store list of all sensors to reference
                setAllSensors(Object.values(data));
                
                // initial "filter" of sensors (none)
                // to display for table
                setFilters({});
                setLoading(false);
            }, (e) => { });
    };

    useEffect(() => {
        // get list of all available sensors
        // upon first page load
        getAllSensors();
    }, []);

    return (<table className="table w-full">
        <thead>
            <tr className="border-b border-gray-400 bg-gray-100">
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Tags</th>
                <th className="px-6 py-4 text-right">Metadata</th>
            </tr>
            <tr className="border-b border-gray-400 bg-gray-100">
                <th className="px-6 py-4 text-left">
                    <input type="text" className="border-gray-400 border-2 px-4 py-2 w-full rounded-sm font-normal" onChange={(e) => searchSensors("name", e)} />
                </th>
                <th className="px-6 py-4 text-left">
                    <input type="text" className="border-gray-400 border-2 px-4 py-2 w-full rounded-sm font-normal" onChange={(e) => searchSensors("location", e)} />
                </th>
                <th className="px-6 py-4 text-left">
                    <input type="text" className="border-gray-400 border-2 px-4 py-2 w-full rounded-sm font-normal" onChange={(e) => searchSensors("tags", e)} />
                </th>
                <th className="pl-6 py-4 text-right"></th>
            </tr>
        </thead>
        <tbody>
            {loading && <tr><td className="px-4 py-4">Loading...</td></tr>}
            {!loading && sensors?.length > 0 && sensors.map((sensor) => (
                <tr data-test-id="sensor-rows" key={sensor.id} className="border-b border-gray-200">
                    <td className="px-6 py-4">{sensor.name || "--"}</td>
                    <td className="px-6 py-4">{sensor.location ? sensor.location.lat + ", " + sensor.location.long : "--"}</td>
                    <td className="px-6 py-4">{sensor?.tags && sensor?.tags.length > 0 ? <SensorTagList tags={sensor.tags} /> : "--"}</td>
                    <td className="px-6 py-4 text-right">
                        <EditSensorBtn sensor={sensor} />
                    </td>
                </tr>
            ))
            }
            {!loading && (!sensors || sensors?.length === 0) && <tr><td className="px-4 py-4">No data.</td></tr>}
        </tbody>
    </table>)

}

export default SensorTable